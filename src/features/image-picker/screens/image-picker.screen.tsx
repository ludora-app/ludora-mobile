import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, String, Wrapper } from '@ludo/ui';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { serialize } from '@/utils/json.utils';
import ROUTES from '@/constants/routes.constants';
import { usePickImage } from '@/hooks/image-picker.hook';
import { ReturnStackParamList, RootStackParamList } from '@/types/routes-params.types';
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';

type LocalSearchParams = RootStackParamList[typeof ROUTES.IMAGE_PICKER.INDEX];

type ReturnParams = ReturnStackParamList[typeof ROUTES.IMAGE_PICKER.INDEX];

export default function ImagePickerScreen() {
  const router = useRouter();
  const { goBackPath } = useLocalSearchParams<LocalSearchParams>();
  const { handlePickImage, images } = usePickImage();

  useEffect(() => {
    if (images && goBackPath) {
      const params: ReturnParams = {
        images: serialize(images),
      };
      router.dismissTo({ params, pathname: goBackPath });
    }
  }, [images, goBackPath, router]);

  return (
    <>
      <FormSheetHeader title="Photo de profil" />
      <Wrapper fill={false} className="gap-4 py-4">
        <TouchableOpacity
          className="border-primary flex-row items-center gap-4 rounded-lg border p-3"
          onPress={() => handlePickImage({ isCamera: true, isMultiple: false })}
        >
          <Icon name="ai-camera-regular" color="#000" />
          <String>Caméra</String>
        </TouchableOpacity>
        <TouchableOpacity
          className="border-primary flex-row items-center gap-4 rounded-lg border p-3"
          onPress={() => handlePickImage({ isCamera: false, isMultiple: false })}
        >
          <Icon name="gallery-regular" color="#000" />
          <String>Gallerie</String>
        </TouchableOpacity>
      </Wrapper>
    </>
  );
}
