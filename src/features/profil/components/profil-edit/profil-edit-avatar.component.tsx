import { isString } from 'radash';
import { Pressable } from 'react-native';
import { useEffect, useMemo } from 'react'
import { BoxAbsolute, IconButton } from '@ludo/ui';
import { ImagePickerAsset } from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';

import COLORS from '@/constants/COLORS';
import { parse } from '@/utils/json.utils';
import ROUTES from '@/constants/routes.constants';
import AvatarMe from '@/components/ui/me/avatarMe/avatar-me.component';
import { ReturnStackParamList, RootStackParamList } from '@/types/routes-params.types';


type LocalSearchParams = RootStackParamList[typeof ROUTES.IMAGE_PICKER.INDEX];

type ReturnParams = ReturnStackParamList[typeof ROUTES.IMAGE_PICKER.INDEX];

export default function ProfilEditAvatar() {

  const router = useRouter();

  const { images } = useLocalSearchParams<ReturnParams>();

  const parsedSelectedImages: ImagePickerAsset[] = useMemo(() => {
    if (!images || !isString(images)) return [];
    try {
      return parse(images);
    } catch {
      return [];
    }
  }, [images]);

  useEffect(() => {
    if (parsedSelectedImages && parsedSelectedImages.length > 0) {
      // DO SOMETHING
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const handleSelectImage = () => {
    const params: LocalSearchParams = {
      goBackPath: '/on-boarding/step-1',
    };

    router.push({
      params,
      pathname: '/image-picker',
    });
  };
  return (
    <Pressable onPress={handleSelectImage}>
      <AvatarMe size="2xl" />
      <BoxAbsolute className='right-0 bottom-0'>
        <IconButton iconName='e-pen-regular' className='bg-white rounded-full' iconColor={COLORS.primary} onPress={handleSelectImage} />
      </BoxAbsolute>
    </Pressable>
  )
}