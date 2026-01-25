import { memo, useEffect } from 'react';
import { useFormikContext } from 'formik';

import useChatRoomInputEmojiPickerStore from '../../../store/chatRoomInputEmojiPickerStore';

type FormikValues = {
  message: string;
};

type EmojiToInputSyncProps = {
  selection: { start: number; end: number };
  setSelection: (selection: { start: number; end: number }) => void;
};

function EmojiToInputSync({ selection, setSelection }: EmojiToInputSyncProps) {
  const { emojiCount, emojiValue } = useChatRoomInputEmojiPickerStore();
  const { setFieldValue, values } = useFormikContext<FormikValues>();

  useEffect(() => {
    if (emojiValue) {
      const insertIndex = selection?.start ?? values.message.length;
      const textBefore = values.message.slice(0, insertIndex);
      const textAfter = values.message.slice(insertIndex);
      const newMessage = textBefore + emojiValue + textAfter;
      setFieldValue('message', newMessage);
      setSelection({
        end: insertIndex + emojiValue.length,
        start: insertIndex + emojiValue.length,
      });
    }
  }, [emojiCount]);

  return null;
}

export default memo(EmojiToInputSync);
