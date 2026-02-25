// import { Message } from '@api/utils/api.types';
// import { View, Image, Pressable } from 'react-native';

// import useChatRoomFullScreenImageModalStore from '../../../store/chatRoomFullScreenImageModalStore';

// export default function ChatRoomMessageContentImages({ messageData }: { messageData: Message }) {
//   const { setImagePath, setIsOpen } = useChatRoomFullScreenImageModalStore();
//   return (
//     <View className="flex-row flex-wrap gap-1">
//       {Array.isArray(messageData.content) &&
//         messageData.content.map((image: string, index: number) => (
//           <Pressable
//             key={index}
//             onPress={() => {
//               setIsOpen(true);
//               setImagePath(image);
//             }}
//             className="rounded-md w-[49%] h-[100px] aspect-[1/1]"
//           >
//             <Image source={{ uri: image }} className="rounded-md w-full h-full" />
//           </Pressable>
//         ))}
//     </View>
//   );
// }
