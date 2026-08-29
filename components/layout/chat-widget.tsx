"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type FormEvent,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import {
  useDriventaChat,
  type UseChatOptions,
  type ChatConnectionStatus,
  type ChatMessage,
} from "@/lib/hooks/use-chat";

/* --------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */
interface PreChatForm {
  name: string;
  email: string;
  phone: string;
}

type WidgetView = "closed" | "pre-chat" | "chat";

/* --------------------------------------------------------------------------
 * Chat Widget root
 * -------------------------------------------------------------------------- */
export function ChatWidget() {
  const [view, setView] = useState<WidgetView>("closed");
  const [preChatForm, setPreChatForm] = useState<PreChatForm>({
    name: "",
    email: "",
    phone: "",
  });
  const [preChatErrors, setPreChatErrors] = useState<Partial<PreChatForm>>({});
  const [chatOptions, setChatOptions] = useState<UseChatOptions | null>(null);
  const [inputText, setInputText] = useState("");

  const { status, messages, conversationId, sendMessage, reconnect, disconnect, error } =
    useDriventaChat(chatOptions);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* auto-scroll when messages change */
  useEffect(() => {
    if (view === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, view]);

  /* transition to chat view once connected */
  useEffect(() => {
    if (status === "connected" && view === "pre-chat") {
      setView("chat");
    }
  }, [status, view]);

  function openWidget() { setView("pre-chat"); }
  function closeWidget() { setView("closed"); }

  function handlePreChatChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPreChatForm((prev) => ({ ...prev, [name]: value }));
    if (preChatErrors[name as keyof PreChatForm]) {
      setPreChatErrors((prev) => { const n = { ...prev }; delete n[name as keyof PreChatForm]; return n; });
    }
  }

  function handleStartChat(e: FormEvent) {
    e.preventDefault();
    const errors: Partial<PreChatForm> = {};
    if (!preChatForm.name.trim()) errors.name = "Name is required.";
    if (Object.keys(errors).length > 0) { setPreChatErrors(errors); return; }
    setPreChatErrors({});
    setChatOptions({
      visitorName: preChatForm.name.trim(),
      visitorEmail: preChatForm.email.trim() || null,
      visitorPhone: preChatForm.phone.trim() || null,
    });
  }

  const handleSend = useCallback(async () => {
    const text = inputText.trim();
    if (!text || status !== "connected") return;
    setInputText("");
    try {
      await sendMessage(text);
    } catch {
      /* errors handled by hook */
    }
  }, [inputText, sendMessage, status]);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  async function handleEnd() {
    await disconnect();
    setView("pre-chat");
    setPreChatForm({ name: "", email: "", phone: "" });
    setChatOptions(null);
  }

  return (
    <>
      {/* Floating toggle button */}
      <div
        className={cn(
          "fixed bottom-[88px] right-4 z-[9998] transition-all duration-300 lg:bottom-6 lg:right-6",
          view !== "closed" && "pointer-events-none opacity-0 scale-90"
        )}
      >
        <button
          id="chat-toggle-btn"
          onClick={openWidget}
          aria-label="Open live chat"
          className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-[0_4px_24px_rgba(37,99,235,0.45)] transition-transform duration-300 hover:-translate-y-1 hover:bg-accent-strong hover:shadow-[0_8px_32px_rgba(37,99,235,0.55)]"
        >
          <Icon name="headset" size={26} />
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" />
          <span className="absolute -top-10 right-0 whitespace-nowrap rounded-lg bg-navy px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            Chat with us
          </span>
        </button>
      </div>

      {/* Widget panel */}
      <div
        className={cn(
          "fixed bottom-[88px] right-4 z-[9999] w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl bg-paper shadow-[0_8px_40px_rgba(10,19,39,0.22)] transition-all duration-300 lg:bottom-6 lg:right-6 lg:max-w-[calc(100vw-1.5rem)]",
          view === "closed"
            ? "pointer-events-none scale-95 opacity-0 translate-y-4"
            : "scale-100 opacity-100 translate-y-0"
        )}
        role="dialog"
        aria-label="Driventa live chat"
      >
        <WidgetHeader
          status={status}
          onClose={closeWidget}
          onEnd={view === "chat" ? handleEnd : undefined}
        />

        {view === "pre-chat" && (
          <PreChatPanel
            form={preChatForm}
            errors={preChatErrors}
            onChange={handlePreChatChange}
            onSubmit={handleStartChat}
            isLoading={status === "creating-session" || status === "connecting"}
            error={error}
          />
        )}

        {view === "chat" && (
          <ChatPanel
            status={status}
            messages={messages}
            conversationId={conversationId}
            inputText={inputText}
            onInputChange={setInputText}
            onSend={handleSend}
            onKeyDown={handleKeyDown}
            onReconnect={reconnect}
            error={error}
            messagesEndRef={messagesEndRef}
          />
        )}
      </div>
    </>
  );
}

/* --------------------------------------------------------------------------
 * Widget Header
 * -------------------------------------------------------------------------- */
function WidgetHeader({
  status,
  onClose,
  onEnd,
}: {
  status: ChatConnectionStatus;
  onClose: () => void;
  onEnd?: () => void;
}) {
  const cfg: Record<ChatConnectionStatus, { label: string; dot: string }> = {
    idle:               { label: "Start a conversation", dot: "bg-muted" },
    "creating-session": { label: "Setting up…",          dot: "bg-amber" },
    connecting:         { label: "Connecting…",           dot: "bg-amber" },
    connected:          { label: "Online",                dot: "bg-positive pulse-dot" },
    reconnecting:       { label: "Reconnecting…",         dot: "bg-amber" },
    disconnected:       { label: "Disconnected",          dot: "bg-muted" },
    error:              { label: "Connection error",      dot: "bg-red-500" },
  };
  const { label, dot } = cfg[status];

  return (
    <div className="flex items-center justify-between bg-accent px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
          <Icon name="headset" size={18} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Driventa Support</p>
          <div className="flex items-center gap-1.5">
            <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
            <span className="text-xs text-white/70">{label}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {onEnd && (
          <button onClick={onEnd} title="End chat"
            className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/15 hover:text-white">
            <Icon name="close" size={16} />
          </button>
        )}
        <button id="chat-close-btn" onClick={onClose} aria-label="Close chat" title="Minimise"
          className="rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/15 hover:text-white">
          <Icon name="chevron-down" size={16} />
        </button>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Pre-chat form panel
 * -------------------------------------------------------------------------- */
function PreChatPanel({
  form, errors, onChange, onSubmit, isLoading, error,
}: {
  form: PreChatForm;
  errors: Partial<PreChatForm>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  error: string;
}) {
  return (
    <div className="px-5 py-5">
      <p className="mb-4 text-sm text-muted">
        Start a conversation with our dispatch team. We typically reply in minutes.
      </p>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <div>
          <input id="chat-visitor-name" name="name" type="text" required
            value={form.name} onChange={onChange} placeholder="Your name *" autoComplete="name"
            className={cn(
              "w-full rounded-xl border px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:bg-paper focus:outline-none focus:ring-4",
              errors.name
                ? "border-red-400 focus:ring-red-200/50"
                : "border-line-strong bg-mist/50 focus:border-accent focus:ring-accent/15"
            )}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <input id="chat-visitor-email" name="email" type="email"
          value={form.email} onChange={onChange} placeholder="Email (optional)" autoComplete="email"
          className="w-full rounded-xl border border-line-strong bg-mist/50 px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:bg-paper focus:outline-none focus:ring-4 focus:ring-accent/15"
        />

        <input id="chat-visitor-phone" name="phone" type="tel"
          value={form.phone} onChange={onChange} placeholder="Phone (optional)" autoComplete="tel"
          className="w-full rounded-xl border border-line-strong bg-mist/50 px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:bg-paper focus:outline-none focus:ring-4 focus:ring-accent/15"
        />

        <button id="chat-start-btn" type="submit" disabled={isLoading}
          className="mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-semibold text-white shadow-[0_4px_16px_rgba(37,99,235,0.3)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-accent-strong disabled:pointer-events-none disabled:opacity-70">
          {isLoading ? (
            <><Icon name="spinner" size={16} className="animate-spin" />Connecting…</>
          ) : (
            <><Icon name="headset" size={16} />Start Chat<Icon name="arrow-right" size={15} /></>
          )}
        </button>
      </form>

      <p className="mt-3 text-center text-xs text-muted">Available 24/7 · Dispatch Support</p>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Chat panel
 * -------------------------------------------------------------------------- */
function ChatPanel({
  status, messages, conversationId, inputText,
  onInputChange, onSend, onKeyDown, onReconnect, error, messagesEndRef,
}: {
  status: ChatConnectionStatus;
  messages: ChatMessage[];
  conversationId: string | null;
  inputText: string;
  onInputChange: (v: string) => void;
  onSend: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onReconnect: () => void;
  error: string;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) {
  const isConnected = status === "connected";
  const isError = status === "error" || status === "disconnected";

  return (
    <div className="flex h-[430px] flex-col">

      {/* Reconnecting banner */}
      {status === "reconnecting" && (
        <div className="flex items-center justify-center gap-2 border-b border-amber/30 bg-amber/10 px-4 py-1.5 text-xs text-amber">
          <Icon name="spinner" size={12} className="animate-spin" />
          Reconnecting to support…
        </div>
      )}

      {/* Error / disconnected banner */}
      {isError && (
        <div className="flex items-center justify-between gap-2 border-b border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          <span>{error || "Connection lost."}</span>
          <button onClick={onReconnect}
            className="shrink-0 rounded-lg border border-red-300 bg-red-100 px-2.5 py-1 font-medium text-red-700 transition-colors hover:bg-red-200">
            Reconnect
          </button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && !isError && (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-muted">
            <Icon name="headset" size={32} className="text-line-strong" />
            <p className="text-sm">No messages yet — say hello!</p>
          </div>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Conversation ID — shown for admin reference so Flutter can join the same group */}
      {conversationId && (
        <div className="border-t border-line px-3 py-1.5 text-center">
          <span className="font-mono text-[10px] text-muted/60 select-all" title="Conversation ID">
            ID: {conversationId}
          </span>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-line p-3">
        <div className="flex items-center gap-2">
          <input
            id="chat-message-input"
            type="text"
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={isConnected ? "Type a message…" : "Connecting…"}
            disabled={!isConnected}
            aria-label="Chat message"
            className="flex-1 rounded-xl border border-line-strong bg-mist/50 px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-accent focus:bg-paper focus:outline-none focus:ring-4 focus:ring-accent/15 disabled:pointer-events-none disabled:opacity-60"
          />
          <button
            id="chat-send-btn"
            onClick={onSend}
            disabled={!isConnected || !inputText.trim()}
            aria-label="Send message"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-white shadow-[0_2px_8px_rgba(37,99,235,0.3)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-accent-strong disabled:pointer-events-none disabled:opacity-50"
          >
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
        <p className="mt-1.5 text-center text-[10px] text-muted/60">
          Enter to send · Driventa Dispatch
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Message bubble
 * -------------------------------------------------------------------------- */
function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isVisitor = msg.senderType === "visitor";
  const isSystem  = msg.senderType === "system";

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <span className="rounded-full border border-line bg-mist px-3 py-1 text-xs text-muted">
          {msg.text}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex", isVisitor ? "justify-end" : "justify-start")}>
      {!isVisitor && (
        <div className="mr-2 mt-auto grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
          <Icon name="headset" size={14} />
        </div>
      )}
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed transition-opacity",
        isVisitor
          ? "rounded-br-sm bg-accent text-white"
          : "rounded-bl-sm border border-line bg-mist text-ink",
        msg.pending && "opacity-60"
      )}>
        <p>{msg.text}</p>
        <p className={cn(
          "mt-1 text-[10px]",
          isVisitor ? "text-right text-white/60" : "text-muted/70"
        )}>
          {msg.pending ? "Sending…" : msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}
