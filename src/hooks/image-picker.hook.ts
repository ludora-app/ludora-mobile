import { useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useRef, useState } from 'react';

import { pickImageImplementation, USER_REJECTED_PERMISSIONS } from '@/utils/image-picker.utils';

import { useAnalytics } from './analytics-trackers.hook';

const ERROR_MESSAGES: Record<string, string> = {
  'camera-not-available': 'image-picker.error.camera_not_available',
  default: 'image-picker.error.default',
  'file-extension-not-allowed': 'image-picker.error.file_extension_not_allowed',
  'image-too-large': 'image-picker.error.image_too_large',
  [USER_REJECTED_PERMISSIONS]: 'image-picker.error.user_rejected_permissions',
};

/**
 * Hook de sélection d'images via caméra ou médiathèque.
 *
 * Comportement :
 * - Les erreurs sont affichées via un toast (non remontées).
 * - Si l'utilisateur annule (null), les images précédemment sélectionnées sont conservées.
 * - Un double appel pendant un pick en cours est ignoré.
 * - Les mises à jour de state sont abandonnées si le composant est démonté.
 */
export function usePickImage() {
  const { toast } = useToast();
  const { t } = useTranslate();
  const { trackError } = useAnalytics();

  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[] | null>(null);
  const [isPending, setIsPending] = useState(false);

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handlePickImage = useCallback(
    async ({ isCamera, isMultiple }: { isCamera: boolean; isMultiple: boolean }) => {
      // Empêche les appels concurrents
      if (isPending) return;

      if (isMountedRef.current) setIsPending(true);

      try {
        const pickedAssets = await pickImageImplementation(isCamera, isMultiple);

        if (!isMountedRef.current) return;

        // null = l'utilisateur a annulé : on conserve la sélection précédente
        if (pickedAssets !== null) {
          setImages(pickedAssets);
        }
      } catch (err: unknown) {
        if (!isMountedRef.current) return;

        trackError({ error: err, showToast: false });

        const errorKey = err instanceof Error ? err.message : '';
        const messageKey = ERROR_MESSAGES[errorKey] ?? ERROR_MESSAGES.default;

        toast({
          message: t(messageKey),
          position: 'top',
          variant: 'error',
        });
      } finally {
        if (isMountedRef.current) setIsPending(false);
      }
    },
    [isPending, t, toast, trackError],
  );

  const clearImages = useCallback(() => {
    setImages(null);
  }, []);

  return {
    clearImages,
    handlePickImage,
    images,
    isPending,
  };
}
