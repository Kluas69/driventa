"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  createChatSession,
  getConversationMessages,
  SIGNALR_HUB_URL,
  type ApiChatMessage,
} from "@/lib/api";

/* --------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */
export type ChatConnectionStatus =
  | "idle"
  | "creating-session"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected"
  | "error";

export interface ChatMessage {
  id: string;
  text: string;
  senderType: "visitor" | "agent" | "system";
  timestamp: Date;
  pending?: boolean;
}

export interface UseChatOptions {
  visitorName: string;
  visitorEmail?: string | null;
  visitorPhone?: string | null;
}

export interface UseChatReturn {
  status: ChatConnectionStatus;
  messages: ChatMessage[];
  conversationId: string | null;
  sendMessage: (text: string) => Promise<void>;
  reconnect: () => void;
  disconnect: () => Promise<void>;
  error: string;
}

/* --------------------------------------------------------------------------
 * Helpers
 * -------------------------------------------------------------------------- */
function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Resolve sender type from EITHER:
 *   - SignalR  payload: senderType = "Admin" | "Visitor" | "System" | "Dispatcher" (string)
 *   - REST API payload: senderType = 0 (Visitor) | 1 (Admin) | 2 (Dispatcher) | 3 (System) (number)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveSenderType(raw: any): ChatMessage["senderType"] {
  if (typeof raw === "string") {
    const lower = raw.toLowerCase();
    if (lower === "visitor") return "visitor";
    if (lower === "system") return "system";
    return "agent"; // Admin | Dispatcher | Sales → agent
  }
  if (typeof raw === "number") {
    if (raw === 0) return "visitor";
    if (raw === 3) return "system";
    return "agent";
  }
  return "agent";
}

/**
 * Parse a message object from EITHER source:
 *
 * SignalR `ReceiveMessage` payload (from handoff doc §7.4):
 *   { messageId, message, senderUserId, senderType: "Admin", timestamp }
 *
 * REST history item (from /api/Messages/conversations/{id}):
 *   { id, content, senderType: 0|1|2|3, senderName, isRead, createdAt }
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseMessageData(data: any): ChatMessage | null {
  if (!data) return null;

  if (typeof data === "string") {
    // Ignore bare GUIDs (conversationId args)
    if (/^[0-9a-f-]{32,36}$/i.test(data.trim())) return null;
    return { id: makeId(), text: data, senderType: "agent", timestamp: new Date(), pending: false };
  }

  // Extract text — SignalR uses `message`, REST uses `content`, fallback `text`
  const text = String(
    data.message ?? data.content ?? data.text ?? ""
  ).trim();
  if (!text) return null;

  // Extract ID — SignalR uses `messageId`, REST uses `id`
  const id = String(data.messageId ?? data.id ?? makeId());

  // Extract timestamp — SignalR uses `timestamp`, REST uses `createdAt`
  const rawTime = data.timestamp ?? data.createdAt;

  return {
    id,
    text,
    senderType: resolveSenderType(data.senderType),
    timestamp: rawTime ? new Date(rawTime) : new Date(),
    pending: false,
  };
}

/**
 * Parse a SignalR hub invocation which may arrive as:
 *   (a) single object arg:  handler(payload)
 *   (b) two string args:    handler(conversationId, message)  ← legacy
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseSignalRArgs(...args: any[]): ChatMessage | null {
  if (!args || args.length === 0) return null;

  // (a) Preferred: look for an object with message content in any arg
  for (const arg of args) {
    if (arg && typeof arg === "object") {
      const parsed = parseMessageData(arg);
      if (parsed) return parsed;
    }
  }

  // (b) Legacy two-string signature: (conversationId, messageText)
  if (args.length >= 2 && typeof args[1] === "string") {
    const possibleGuid = typeof args[0] === "string" && /^[0-9a-f-]{32,36}$/i.test(args[0].trim());
    if (possibleGuid) {
      // args[0] is conversationId, args[1] is the message text
      const text = args[1].trim();
      if (text) return { id: makeId(), text, senderType: "agent", timestamp: new Date(), pending: false };
    }
  }

  // (c) Single string
  if (args.length === 1 && typeof args[0] === "string") {
    return parseMessageData(args[0]);
  }

  return null;
}

/* --------------------------------------------------------------------------
 * useDriventaChat hook
 *
 * Strategy:
 * 1. SignalR WebSocket for instant real-time delivery
 * 2. 2-second REST polling as bulletproof fallback
 *    (backend may not broadcast via SignalR — see ChatHub.cs)
 * 3. Smart dedup by message ID — no duplicates, no flicker
 * ------------------------------------------------------------------------- */
export function useDriventaChat(options: UseChatOptions | null): UseChatReturn {
  const [status, setStatus] = useState<ChatConnectionStatus>("idle");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string>("");
  const [conversationId, setConversationId] = useState<string | null>(null);

  const conversationIdRef = useRef<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connectionRef = useRef<any>(null);
  const mountedRef = useRef(true);
  const optionsRef = useRef<UseChatOptions | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Track last seen message IDs to only show NEW messages from polls
  const seenMessageIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, []);

  /* ---- Append single message with full dedup ----------------------------- */
  const appendMessage = useCallback((incoming: ChatMessage) => {
    if (seenMessageIdsRef.current.has(incoming.id)) return;
    seenMessageIdsRef.current.add(incoming.id);

    setMessages((prev) => {
      // Already in list
      if (prev.some((m) => m.id === incoming.id)) return prev;

      // Reconcile with optimistic visitor bubble
      if (incoming.senderType === "visitor") {
        const pendingIdx = prev.findIndex(
          (m) => m.pending && m.senderType === "visitor" && m.text === incoming.text
        );
        if (pendingIdx !== -1) {
          const next = [...prev];
          next[pendingIdx] = { ...incoming, pending: false };
          return next;
        }
      }

      return [...prev, incoming];
    });
  }, []);

  /* ---- Full REST history sync -------------------------------------------- */
  const syncHistoryFromRest = useCallback(async (convId: string) => {
    if (!convId || !mountedRef.current) return;
    try {
      const res = await getConversationMessages(convId);
      if (!res.success || !res.data) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataObj: any = res.data;
      const rawList: ApiChatMessage[] =
        Array.isArray(dataObj) ? dataObj :
        Array.isArray(dataObj?.messages) ? dataObj.messages :
        Array.isArray(dataObj?.items) ? dataObj.items :
        [];

      if (rawList.length === 0) return;

      // Only process NEW messages (not yet in seenIds)
      rawList.forEach((raw) => {
        const parsed = parseMessageData(raw);
        if (parsed && !seenMessageIdsRef.current.has(parsed.id)) {
          appendMessage(parsed);
        }
      });
    } catch {
      // Silent — polling should not surface errors to user
    }
  }, [appendMessage]);

  /* ---- Start aggressive REST polling (2-second interval) ----------------- */
  const startPolling = useCallback((convId: string) => {
    if (pollTimerRef.current) clearInterval(pollTimerRef.current);

    // Immediate first sync
    syncHistoryFromRest(convId);

    // Then every 2 seconds — guarantees admin messages always arrive
    // even when SignalR broadcast is missing on backend (ChatHub.cs bug)
    pollTimerRef.current = setInterval(() => {
      if (mountedRef.current && conversationIdRef.current) {
        syncHistoryFromRest(conversationIdRef.current);
      }
    }, 2000);
  }, [syncHistoryFromRest]);

  /* ---- Core connect ------------------------------------------------------- */
  const connect = useCallback(async (opts: UseChatOptions) => {
    if (!mountedRef.current) return;

    // Clean up any existing connection
    if (connectionRef.current) {
      try { await connectionRef.current.stop(); } catch { /* ignore */ }
      connectionRef.current = null;
    }
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }

    optionsRef.current = opts;
    setStatus("creating-session");
    setError("");
    setMessages([]);
    setConversationId(null);
    conversationIdRef.current = null;
    seenMessageIdsRef.current = new Set();

    try {
      /* ── Step 1: Create REST session ───────────────────────────────────── */
      const sessionResult = await createChatSession({
        visitorName: opts.visitorName,
        visitorEmail: opts.visitorEmail ?? null,
        visitorPhone: opts.visitorPhone ?? null,
      });

      if (!mountedRef.current) return;
      if (!sessionResult.success) {
        throw new Error(sessionResult.message ?? "Failed to create chat session");
      }

      const convId = sessionResult.data.conversationId;
      conversationIdRef.current = convId;
      setConversationId(convId);

      /* ── Step 2: Start REST polling immediately ─────────────────────────
           This is the RELIABLE path. Admin messages will ALWAYS arrive here
           every 2 seconds — regardless of SignalR backend broadcast bug.
       */
      startPolling(convId);

      /* ── Step 3: Connect SignalR (best-effort, instant delivery) ─────────
           Per backend handoff doc §7.1: public visitors connect without JWT.
           The CORS policy "Dashboard" allows any origin — no credentials needed.
           Try standard negotiation first; fall back to WS-only on failure.
       */
      setStatus("connecting");
      try {
        const signalR = await import("@microsoft/signalr");
        if (!mountedRef.current) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleIncoming = (...args: any[]) => {
          if (!mountedRef.current) return;
          console.log("[Chat] SignalR ReceiveMessage:", JSON.stringify(args));
          const parsed = parseSignalRArgs(...args);
          if (parsed) appendMessage(parsed);
        };

        const buildConnection = (skipNeg: boolean) =>
          new signalR.HubConnectionBuilder()
            .withUrl(SIGNALR_HUB_URL, {
              withCredentials: false,
              ...(skipNeg
                ? { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets }
                : {}),
            })
            .withAutomaticReconnect([0, 2000, 5000, 10000, 20000])
            .configureLogging(signalR.LogLevel.Warning)
            .build();

        let connection = buildConnection(false);
        connectionRef.current = connection;

        // Register ALL known event name variants from the spec + fallbacks
        [
          "ReceiveMessage", "receiveMessage",
          "NewMessage",    "newMessage",
          "MessageReceived", "messageReceived",
          "BroadcastMessage", "broadcastMessage",
        ].forEach((evt) => connection.on(evt, handleIncoming));

        connection.onreconnecting(() => {
          if (mountedRef.current) setStatus("reconnecting");
        });
        connection.onreconnected(async () => {
          if (!mountedRef.current) return;
          setStatus("connected");
          if (conversationIdRef.current) {
            try { await connection.invoke("JoinConversation", conversationIdRef.current); } catch { /* ignore */ }
          }
        });
        connection.onclose(() => {
          if (mountedRef.current) setStatus("disconnected");
        });

        try {
          await connection.start();
          console.log("[Chat] SignalR connected (standard negotiation)");
        } catch (negErr) {
          console.warn("[Chat] Standard negotiation failed, retrying WebSocket-only:", negErr);
          // Rebuild with skipNegotiation=true (bypasses /negotiate CORS issue)
          try { await connection.stop(); } catch { /* ignore */ }
          connection = buildConnection(true);
          connectionRef.current = connection;
          [
            "ReceiveMessage", "receiveMessage",
            "NewMessage",    "newMessage",
            "MessageReceived", "messageReceived",
            "BroadcastMessage", "broadcastMessage",
          ].forEach((evt) => connection.on(evt, handleIncoming));
          connection.onreconnecting(() => {
            if (mountedRef.current) setStatus("reconnecting");
          });
          connection.onreconnected(async () => {
            if (!mountedRef.current) return;
            setStatus("connected");
            if (conversationIdRef.current) {
              try { await connection.invoke("JoinConversation", conversationIdRef.current); } catch { /* ignore */ }
            }
          });
          connection.onclose(() => {
            if (mountedRef.current) setStatus("disconnected");
          });
          await connection.start();
          console.log("[Chat] SignalR connected (WebSocket-only fallback)");
        }

        if (!mountedRef.current) {
          await connection.stop();
          return;
        }

        // Join the conversation SignalR group (§7.2)
        try {
          await connection.invoke("JoinConversation", convId);
          console.log("[Chat] Joined group:", convId);
        } catch (e) {
          console.warn("[Chat] JoinConversation failed (polling still active):", e);
        }

        if (mountedRef.current) setStatus("connected");
      } catch (signalRErr) {
        // SignalR fully failed — NOT fatal. 2-second REST polling covers delivery.
        console.warn("[Chat] SignalR unavailable, polling-only mode:", signalRErr);
        if (mountedRef.current) setStatus("connected");
      }

      // Add welcome message after connection established
      if (mountedRef.current) {
        setMessages((prev) => {
          // Only add welcome if no real messages loaded yet
          const realMsgs = prev.filter((m) => m.senderType !== "system");
          if (realMsgs.length === 0 && prev.length === 0) {
            return [{
              id: `welcome-${Date.now()}`,
              text: "Connected — a Driventa team member will be with you shortly.",
              senderType: "system",
              timestamp: new Date(),
            }];
          }
          return prev;
        });
      }
    } catch (err) {
      console.error("[Chat] Connect error:", err);
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : "Failed to connect to chat.");
        setStatus("error");
      }
    }
  }, [appendMessage, startPolling]);

  /* ---- Auto-connect when options provided ------------------------------- */
  useEffect(() => {
    if (!options) return;
    connect(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.visitorName]);

  /* ---- Send message ------------------------------------------------------- */
  const sendMessage = useCallback(async (text: string) => {
    const connection = connectionRef.current;
    const convId = conversationIdRef.current;
    if (!convId) throw new Error("No active chat session");

    // 1. Optimistic bubble immediately
    const tempId = makeId();
    const optimistic: ChatMessage = {
      id: tempId,
      text,
      senderType: "visitor",
      timestamp: new Date(),
      pending: true,
    };
    setMessages((prev) => [...prev, optimistic]);

    // 2. Send via SignalR if connected, otherwise REST
    if (connection && connection.state === "Connected") {
      await connection.invoke("SendMessage", convId, text);
    } else {
      // Direct HTTP fallback send
      try {
        await fetch(`${(await import("@/lib/api")).BASE_URL}/api/public/chat/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conversationId: convId, message: text }),
        });
      } catch { /* polling will confirm */ }
    }

    // 3. Immediate REST sync 1 second after to confirm
    setTimeout(() => {
      if (convId && mountedRef.current) syncHistoryFromRest(convId);
    }, 800);
  }, [syncHistoryFromRest]);

  /* ---- Reconnect --------------------------------------------------------- */
  const reconnect = useCallback(() => {
    const opts = optionsRef.current;
    if (opts) connect(opts);
  }, [connect]);

  /* ---- Disconnect -------------------------------------------------------- */
  const disconnect = useCallback(async () => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    if (connectionRef.current) {
      try { await connectionRef.current.stop(); } catch { /* ignore */ }
      connectionRef.current = null;
    }
    if (mountedRef.current) {
      setStatus("idle");
      setMessages([]);
      setConversationId(null);
      conversationIdRef.current = null;
      seenMessageIdsRef.current = new Set();
    }
  }, []);

  /* ---- Cleanup on unmount ------------------------------------------------ */
  useEffect(() => {
    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      if (connectionRef.current) connectionRef.current.stop().catch(() => {});
    };
  }, []);

  return { status, messages, conversationId, sendMessage, reconnect, disconnect, error };
}
