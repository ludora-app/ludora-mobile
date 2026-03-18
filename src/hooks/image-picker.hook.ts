import { useState } from 'react';
import { useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import * as ImagePicker from 'expo-image-picker';

import { pickImageImplementation } from '@/utils/image-picker.utils';

import { useAnalytics } from './analytics-trackers.hook';

const USER_REJECTED_PERMISSIONS = 'User rejected permissions';

const ERROR_MESSAGES: Record<string, string> = {
  default: 'image-picker.error.default',
  'file-extension-not-allowed': 'image-picker.error.file_extension_not_allowed',
  'image-too-large': 'image-picker.error.image_too_large',
  [USER_REJECTED_PERMISSIONS]: 'image-picker.error.user_rejected_permissions',
};

/**
 * custom hook to manage the selection of images.
 * - uses a toast to display the errors, instead of returning them.
 */
export function usePickImage() {
  const { toast } = useToast();
  const { t } = useTranslate();
  const { trackError } = useAnalytics();

  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[] | null>(null);
  const [isPending, setIsPending] = useState(false);

  /**
   * open the camera or the library to select images.
   */
  const handlePickImage = async ({ isCamera, isMultiple }: { isCamera: boolean; isMultiple: boolean }) => {
    setIsPending(true);

    try {
      const pickedAssets = await pickImageImplementation(isCamera, isMultiple);
      setImages(pickedAssets);
    } catch (err) {
      trackError({ error: err, showToast: false });
      // in case of error, determine the corresponding message
      let errorMessage = ERROR_MESSAGES.default;
      if (err instanceof Error) {
        errorMessage = ERROR_MESSAGES[err.message] || ERROR_MESSAGES.default;
      }

      // display the error toast
      toast({
        message: t(errorMessage),
        position: 'top',
        variant: 'error',
      });

      setImages(null);
    } finally {
      setIsPending(false);
    }
  };

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
