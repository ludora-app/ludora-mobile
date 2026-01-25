import { useEffect } from 'react';

import useChatRoomInputStore from '../../store/chatRoomInputStore';

function ChatRoomInputHandleChange({ inputValue }: { inputValue: string }) {
  const { setIsInputValueEmpty } = useChatRoomInputStore();

  const isInputValueEmpty = inputValue.length === 0;

  useEffect(() => {
    setIsInputValueEmpty(isInputValueEmpty);
  }, [isInputValueEmpty]);

  return null;
}

export default ChatRoomInputHandleChange;
