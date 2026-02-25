// import { useEffect, useState } from 'react';
// import * as FileSystem from 'expo-file-system';

// export const usePutUrlAudioInCache = (audioUrl: string) => {
//   const [localUri, setLocalUri] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchAudio = async () => {
//     try {
//       if (audioUrl.startsWith('https://')) {
//         setIsLoading(true);
//         const fileUri = `${FileSystem.cacheDirectory}${audioUrl.split('/').pop()}`;
//         console.log('fileUri', fileUri);
//         const { exists } = await FileSystem.getInfoAsync(fileUri);
//         console.log('exists', exists);
//         if (!exists) {
//           await FileSystem.downloadAsync(audioUrl, fileUri);
//         }
//         setLocalUri(fileUri);
//       }
//     } catch (error) {
//       console.log('error', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchAudio();
//   }, [audioUrl]);
//   return { isLoading, localUri };
// };
