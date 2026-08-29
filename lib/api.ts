/**
 * ============================================================================
 * Driventa — Backend API client
 * ----------------------------------------------------------------------------
 * Base URL: https://driventabackend-production-906b.up.railway.app
 * ============================================================================
 */

export const BASE_URL = "https://driventabackend-production-906b.up.railway.app";

/* --------------------------------------------------------------------------
 * Shared response envelope
 * ------------------------------------------------------------------------- */
export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data: T;
  errors: string[] | null;
}

/* --------------------------------------------------------------------------
 * Carrier Application
 * ------------------------------------------------------------------------- */
export type EquipmentType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const EQUIPMENT_TYPE_MAP: Record<string, EquipmentType> = {
  "Dry Van": 0,
  "Reefer": 1,
  "Flatbed": 2,
  "Step Deck": 3,
  "Box Truck": 4,
  "Hotshot": 5,
  "Power Only": 6,
};

export interface ApplicationPayload {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  equipmentType: EquipmentType;
  truckCount: number;
  mcNumber: string;
  dotNumber: string;
  preferredLanes: string;
  additionalDetails: string;
}

export interface ApplicationData {
  id: string;
  applicationNumber: string;
}

export async function submitApplication(
  payload: ApplicationPayload
): Promise<ApiResponse<ApplicationData>> {
  const res = await fetch(`${BASE_URL}/api/public/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.status === 429) {
    return {
      success: false,
      message: "Too many requests. Please try again later.",
      data: null as unknown as ApplicationData,
      errors: ["Rate limited"],
    };
  }

  const json: ApiResponse<ApplicationData> = await res.json();
  return json;
}

/* --------------------------------------------------------------------------
 * Chat Session
 * ------------------------------------------------------------------------- */
export interface ChatSessionPayload {
  visitorName: string;
  visitorEmail?: string | null;
  visitorPhone?: string | null;
}

export interface ChatSessionData {
  conversationId: string;
  visitorId: string;
}

export async function createChatSession(
  payload: ChatSessionPayload
): Promise<ApiResponse<ChatSessionData>> {
  const res = await fetch(`${BASE_URL}/api/public/chat/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json: ApiResponse<ChatSessionData> = await res.json();
  return json;
}

/* --------------------------------------------------------------------------
 * Chat Message types
 * ------------------------------------------------------------------------- */
export interface ApiChatMessage {
  id: string;
  senderType: number; // 0=Visitor, 1=Admin, 2=Dispatcher, 3=System
  senderName: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface ConversationDetailData {
  id: string;
  visitorName: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageSenderType: number;
  messages: ApiChatMessage[];
}

/**
 * Fetches conversation message history from the backend.
 *
 * Tries multiple candidate public endpoints in priority order.
 * The /api/Messages/conversations/{id} endpoint is admin-only (requires Auth),
 * so we fall back to public routes that the visitor can access without a token.
 *
 * Known candidate URLs (try in order):
 * 1. /api/public/chat/{conversationId}/messages
 * 2. /api/public/chat/{conversationId}
 * 3. /api/public/chat/messages/{conversationId}
 * 4. /api/Messages/conversations/{conversationId}   ← admin only, last resort
 */
export async function getConversationMessages(
  conversationId: string
): Promise<ApiResponse<ConversationDetailData>> {
  const endpoints = [
    `${BASE_URL}/api/public/chat/${conversationId}/messages`,
    `${BASE_URL}/api/public/chat/${conversationId}`,
    `${BASE_URL}/api/public/chat/messages/${conversationId}`,
    `${BASE_URL}/api/Messages/conversations/${conversationId}`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) continue;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const json: any = await res.json();
      if (!json) continue;

      // Already the correct shape { success, data: { messages: [...] } }
      if (json.data && Array.isArray(json.data.messages)) {
        return json as ApiResponse<ConversationDetailData>;
      }

      // data is a direct array of messages
      if (json.data && Array.isArray(json.data)) {
        return {
          success: true,
          message: "OK",
          data: {
            id: conversationId,
            visitorName: "",
            unreadCount: 0,
            lastMessage: "",
            lastMessageSenderType: 0,
            messages: json.data,
          },
          errors: null,
        };
      }

      // Root-level array of messages
      if (Array.isArray(json)) {
        return {
          success: true,
          message: "OK",
          data: {
            id: conversationId,
            visitorName: "",
            unreadCount: 0,
            lastMessage: "",
            lastMessageSenderType: 0,
            messages: json,
          },
          errors: null,
        };
      }
    } catch {
      // try next endpoint
    }
  }

  return {
    success: false,
    message: "Unable to fetch conversation history",
    data: null as unknown as ConversationDetailData,
    errors: ["All endpoints failed"],
  };
}

export const SIGNALR_HUB_URL = `${BASE_URL}/hubs/chat`;
