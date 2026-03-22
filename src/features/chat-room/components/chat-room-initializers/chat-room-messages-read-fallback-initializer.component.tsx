import { useEffect } from "react";

import { useMessagesUnread } from "@/queries/get-has-messages-unreads.query";
import { useInvalidateConversationsFindAllByUserUid, useInvalidateConversationsHasUnreadMessages } from "@/api/generated/invalidate-queries";

const DELAY_TO_INVALIDATE_IN_MS = 1000;

export default function ChatRoomMessagesReadFallbackInitializer() {
  const { data: getHasUnreadMessages } = useMessagesUnread()

  const { hasUnreadMessages } = getHasUnreadMessages || {};

  const invaliteConversationHasUnreadMessages = useInvalidateConversationsHasUnreadMessages();
  const invalidateConversationsFindAllByUserUid = useInvalidateConversationsFindAllByUserUid();

  // This effect acts as a fallback for cold starts (e.g., from push notifications).
  // If the app is opened directly into a chat room, the WebSocket might not be connected yet
  // to receive the "ReadByMe" event. This ensures the UI is refreshed on mount.
  useEffect(() => {
    if (hasUnreadMessages) {
      const timeout = setTimeout(() => {
        if (hasUnreadMessages) {
          invaliteConversationHasUnreadMessages();
          invalidateConversationsFindAllByUserUid();
        }
      }, DELAY_TO_INVALIDATE_IN_MS);

      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [invaliteConversationHasUnreadMessages, hasUnreadMessages, invalidateConversationsFindAllByUserUid]);

  return null

}