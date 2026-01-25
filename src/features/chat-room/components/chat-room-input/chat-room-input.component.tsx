import * as yup from 'yup';
import { Field, Formik } from 'formik';
import { MessageType } from '@api/utils/api.types';
import { useEffect, useRef, useState } from 'react';
import { Box, cn, Icon, FormikCustomInput } from '@components/nysaUi';
import { KeyboardController } from 'react-native-keyboard-controller';
import { Pressable, TextInput, TextInputSelectionChangeEventData, NativeSyntheticEvent } from 'react-native';

import useKeyboardVisible from '../../hooks/useKeyboardVisible';
import ChatRoomInputHandleChange from './ChatRoomInputHandleChange';
import { useChatRoomInputAudioStore } from '../../store/chatRoomInputAudioStore';
import useChatRoomInputEmojiPickerStore from '../../store/chatRoomInputEmojiPickerStore';
import ChatRoomInputCameraAlbumIcons from './chat-room-input-camera-album-icons.component';
import EmojiToInputSync from './chat-room-input-emoji-picker/ChatRoomInputEmojiPickerToInputSync';
import { useChatRoomMessageOptimisticQueue } from '../../queries/chat-room-message-queue.queries';

type FormikSubmitValues = {
  message: string;
};

const validationSchema = yup.object().shape({
  message: yup.string().required(),
});

export default function ChatRoomInput() {
  const isKeyboardVisible = useKeyboardVisible();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [selection, setSelection] = useState<{ start: number; end: number }>({
    end: 0,
    start: 0,
  });
  const { isRecording } = useChatRoomInputAudioStore();
  const { addOptimisticMessageToQueue } = useChatRoomMessageOptimisticQueue();

  const { isEmojiPickerOpen, setEmojiPickerOpen, setEmojiValue } = useChatRoomInputEmojiPickerStore();

  const onSubmit = (values: FormikSubmitValues) => {
    addOptimisticMessageToQueue(values.message, MessageType.TEXT);
  };

  useEffect(() => {
    if (isKeyboardVisible) {
      setEmojiPickerOpen(false);
    }
  }, [isKeyboardVisible]);

  useEffect(() => {
    if (isFocused && !isEmojiPickerOpen) {
      setTimeout(() => {
        KeyboardController.setFocusTo('current');
      }, 50);
    }
  }, [isFocused]);

  useEffect(
    () => () => {
      setEmojiValue('');
    },
    [],
  );

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, setFieldValue, values }) => (
        <Box className="flex flex-row items-center gap-2">
          <EmojiToInputSync selection={selection} setSelection={setSelection} />
          <ChatRoomInputHandleChange inputValue={values.message} />
          <Box className="flex-1 justify-center overflow-hidden">
            <Box className="absolute left-1 z-50">
              {isEmojiPickerOpen && !isKeyboardVisible ? (
                <Icon
                  variant="keyboard-solid"
                  size="sm"
                  wrapper
                  onPress={() => {
                    KeyboardController.setFocusTo('current');
                  }}
                />
              ) : (
                <Icon
                  variant="smile-solid"
                  color="#fff"
                  wrapper
                  size="sm"
                  onPress={async () => {
                    setEmojiPickerOpen(true);
                    inputRef.current?.focus();
                    isKeyboardVisible &&
                      (await KeyboardController.dismiss({
                        keepFocus: true,
                      }));
                  }}
                />
              )}
            </Box>
            <ChatRoomInputCameraAlbumIcons inputValue={values.message} />

            <Field
              inputRef={inputRef}
              selection={selection}
              placeholder="Tape ton message..."
              name="message"
              component={FormikCustomInput}
              className="max-h-40 min-h-10 px-10 align-middle"
              multiline
              showDeleteIcon={false}
              showSoftInputOnFocus={isFocused}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => {
                setIsFocused(false);
              }}
              onSelectionChange={(event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
                setSelection(event.nativeEvent.selection);
              }}
              onChangeText={(text: string) => {
                if (isRecording) {
                  return;
                }
                setFieldValue('message', text);
              }}
            />
          </Box>
          {(isKeyboardVisible || values.message.length > 0) && (
            <Box className="w-14">
              <Pressable
                className={cn('items-center justify-center rounded-full bg-primary', {
                  'opacity-50': values.message.length === 0,
                })}
                onPress={() => handleSubmit()}
                style={{
                  height: 50,
                  width: 50,
                }}
                disabled={values.message.length === 0}
              >
                <Icon variant="paper-plane-solid" />
              </Pressable>
            </Box>
          )}
        </Box>
      )}
    </Formik>
  );
}
