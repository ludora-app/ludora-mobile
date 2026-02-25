// import { Icon } from '@components/nysaUi';
// import * as MediaLibrary from 'expo-media-library';
// import { MessageType } from '@api/utils/api.types';
// import { useEffect, useRef, useState } from 'react';
// import { File, Paths, Directory } from 'expo-file-system/next';
// import { Dialog, DialogContent, DialogToaster } from '@nysaUi/dialog';
// import { ActivityIndicator, Alert, Dimensions, FlatList, Image, View } from 'react-native';

// import { useGetMessageByChatRoomId } from '../../../queries/useGetMessageByChatRoomId';
// import useChatRoomFullScreenImageModalStore from '../../../store/chatRoomFullScreenImageModalStore';

// const { width } = Dimensions.get('window');
// const viewabilityConfig = {
//   itemVisiblePercentThreshold: 50,
// };

// export default function ChatRoomMessageFullScreenImageModal() {
//   const flatlistRef = useRef<FlatList>(null);
//   const { imagePath, isOpen, setIsOpen } = useChatRoomFullScreenImageModalStore();
//   const { messages } = useGetMessageByChatRoomId();
//   const [currentImage, setCurrentImage] = useState(imagePath);
//   const [toastContent, setToastContent] = useState<{
//     show: boolean;
//     message: string;
//     variant: 'success' | 'error';
//   }>({
//     message: '',
//     show: false,
//     variant: 'success',
//   });
//   const [isDownloading, setIsDownloading] = useState(false);

//   const images = messages
//     ? messages
//         .filter(message => message.type === MessageType.IMAGE || message.type === MessageType.IMAGES)
//         .flatMap(message => message.content)
//     : [];

//   const selectedImageIndex = images.findIndex(image => image === imagePath);

//   useEffect(() => {
//     if (isOpen && selectedImageIndex !== -1) {
//       flatlistRef.current?.scrollToIndex({
//         animated: false,
//         index: selectedImageIndex,
//       });
//       setCurrentImage(imagePath);
//     }
//   }, [isOpen]);

//   const onViewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
//     if (viewableItems.length > 0) {
//       setCurrentImage(viewableItems[0].item); // Mettre à jour l'image affichée
//     }
//   };

//   // function to download image and save it in the cache directory then save it in the media library
//   const downloadImage = async () => {
//     if (isDownloading) return;
//     setIsDownloading(true);
//     if (!currentImage) return;
//     const { status } = await MediaLibrary.requestPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission refusée', "Activez l'accès à la galerie pour enregistrer l'image.");
//       return;
//     }
//     const randomId = Math.random().toString(36).substring(2, 15);
//     const destination = new Directory(Paths.cache, randomId);
//     try {
//       if (!destination.exists) {
//         destination.create();
//       }
//       const output = await File.downloadFileAsync(currentImage, destination);
//       await MediaLibrary.createAssetAsync(output.uri);
//       setToastContent({
//         message: "L'image a été enregistrée dans votre galerie !",
//         show: true,
//         variant: 'success',
//       });
//     } catch (error) {
//       setToastContent({
//         message: "Une erreur est survenue lors de l'enregistrement de l'image.",
//         show: true,
//         variant: 'error',
//       });
//     } finally {
//       setIsDownloading(false);
//       setToastContent({
//         message: '',
//         show: false,
//         variant: 'success',
//       });
//     }
//   };

//   return (
//     <Dialog>
//       <DialogContent visible={isOpen} setVisible={setIsOpen} container={false}>
//         <DialogToaster show={toastContent.show} message={toastContent.message} variant={toastContent.variant} />
//         <View className="bg-main h-full w-full">
//           <View className="absolute top-0 left-0 z-10 w-full flex-row items-center justify-between px-4 py-2">
//             <Icon variant="arrow-left-solid" size="lg" wrapper onPress={() => setIsOpen(false)} />
//             {isDownloading ? (
//               <ActivityIndicator size="small" color="#fff" className="mr-4" />
//             ) : (
//               <Icon variant="download-solid" size="lg" wrapper onPress={downloadImage} />
//             )}
//           </View>
//           <FlatList
//             ref={flatlistRef}
//             data={images}
//             horizontal
//             snapToInterval={width}
//             snapToAlignment="center"
//             decelerationRate="fast"
//             keyExtractor={item => item}
//             getItemLayout={(_, index) => ({
//               index,
//               length: width,
//               offset: width * index,
//             })}
//             disableIntervalMomentum
//             onScrollToIndexFailed={({ index }) => {
//               flatlistRef.current?.scrollToOffset({
//                 animated: false,
//                 offset: index * width,
//               });
//             }}
//             onViewableItemsChanged={onViewableItemsChanged}
//             viewabilityConfig={viewabilityConfig}
//             renderItem={({ item }) => (
//               <View className="h-screen w-screen items-center justify-center">
//                 <Image source={{ uri: item }} className="aspect-[1/1] w-[90%] rounded-lg bg-white" resizeMode="cover" />
//               </View>
//             )}
//           />
//         </View>
//       </DialogContent>
//     </Dialog>
//   );
// }
