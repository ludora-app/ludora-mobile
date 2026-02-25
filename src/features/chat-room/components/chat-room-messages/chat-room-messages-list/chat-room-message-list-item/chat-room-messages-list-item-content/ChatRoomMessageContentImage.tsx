// import { Message } from '@api/utils/api.types';
// import { Image, Pressable } from 'react-native';

// import useChatRoomFullScreenImageModalStore from '../../../store/chatRoomFullScreenImageModalStore';

// export default function ChatRoomMessageContentImage({ messageData }: { messageData: Message }) {
//   const { setImagePath, setIsOpen } = useChatRoomFullScreenImageModalStore();
//   return (
//     <Pressable
//       onPress={() => {
//         setIsOpen(true);
//         setImagePath(messageData.content as string);
//       }}
//     >
//       <Image source={{ uri: messageData.content as string }} className="rounded-md size-52" />
//     </Pressable>
//   );
// }
