import { useState } from 'react';
import { useToast } from '@chillui/ui';
import * as ImagePicker from 'expo-image-picker';

import { pickImageImplementation } from '@/utils/image-picker.utils';

// Constantes pour identifier l'erreur de permission
const USER_REJECTED_PERMISSIONS = 'User rejected permissions';

// Messages d'erreur
const ERROR_MESSAGES: Record<string, string> = {
  default: 'Une erreur inconnue est survenue.',
  'file-extension-not-allowed':
    'Fichier non autorisé. Veuillez sélectionner une image au format JPG, JPEG, PNG ou GIF.',
  'image-too-large': 'Image trop grande. Veuillez choisir une image inférieure à 10MB.',
  [USER_REJECTED_PERMISSIONS]:
    "Permission refusée. Veuillez autoriser l'accès à l'appareil photo ou à la bibliothèque.",
};

/**
 * custom hook to manage the selection of images.
 * - uses a toast to display the errors, instead of returning them.
 */
export function usePickImage() {
  const { toast } = useToast();

  // selected images
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[] | null>(null);

  // indicates if an operation is in progress
  const [isPending, setIsPending] = useState(false);

  /**
   * open the camera or the library to select images.
   */
  const handlePickImage = async ({ isCamera, isMultiple }: { isCamera: boolean; isMultiple: boolean }) => {
    setIsPending(true);

    try {
      // try to retrieve the assets
      const pickedAssets = await pickImageImplementation(isCamera, isMultiple);
      // even if `pickedAssets` is `null` (cancellation), update the state (possibly null)
      setImages(pickedAssets);
    } catch (err) {
      // in case of error, determine the corresponding message
      let errorMessage = ERROR_MESSAGES.default;
      if (err instanceof Error) {
        errorMessage = ERROR_MESSAGES[err.message] || ERROR_MESSAGES.default;
      }

      // display the error toast
      toast({
        message: errorMessage,
        position: 'top',
        variant: 'error',
      });

      // reset the images list
      setImages(null);
    } finally {
      setIsPending(false);
    }
  };

  /**
   * reset the images list
   */
  const clearImages = () => {
    setImages(null);
  };

  return {
    clearImages,
    handlePickImage,
    images,
    isPending,
  };
}
