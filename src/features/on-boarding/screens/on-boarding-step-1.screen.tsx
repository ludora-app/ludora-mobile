import { isString } from 'radash';
import { useEffect, useMemo } from 'react';
import { useTranslate } from '@tolgee/react';
import { TouchableOpacity } from 'react-native';
import { ImagePickerAsset } from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Icon, Image, String, WrapperScrollView } from '@ludo/ui';

import { parse } from '@/utils/json.utils';
import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { ReturnStackParamList, RootStackParamList } from '@/types/routes-params.types';

import { useOnBoardingStore } from '../stores/on-boarding.store';
import { useOnBoardingUserImageSource } from '../hooks/on-boarding-user-image-source.hook';

type LocalSearchParams = RootStackParamList[typeof ROUTES.IMAGE_PICKER.INDEX];

type ReturnParams = ReturnStackParamList[typeof ROUTES.IMAGE_PICKER.INDEX];

export default function OnBoardingStep1Screen() {
  const { t } = useTranslate();
  const router = useRouter();
  const { imageUrl: userImageUrl, isGoogle: isUserImageGoogle } = useOnBoardingUserImageSource();

  const profilePicture = useOnBoardingStore(state => state.profilePicture);
  const setProfilePicture = useOnBoardingStore(state => state.setProfilePicture);
  const { images } = useLocalSearchParams<ReturnParams>();

  const imageUrl = profilePicture?.uri || userImageUrl;

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
      setProfilePicture(parsedSelectedImages[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const handleSelectImage = () => {
    const params: LocalSearchParams = {
      goBackPath: '/on-boarding/step-1',
    };

    router.navigate({
      params,
      pathname: '/image-picker',
    });
  };



  return (
    <WrapperScrollView contentContainerClassName="gap-8 pt-8">
      <String variant="body-3" font="primaryBold" className="text-center">
        {t('on-boarding.step-1.title')}
      </String>

      <TouchableOpacity
        className="border-primary aspect-square size-3/6 items-center justify-center self-center  rounded-full border border-dotted"
        onPress={handleSelectImage}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} className="size-full overflow-hidden rounded-full" />
        ) : (
          <String variant="title-3" colorVariant="primary" font="primaryBold">
            +
          </String>
        )}
        <Icon name="e-pen-regular" size="lg" color={COLORS.primary} className="absolute bottom-2.5 right-2.5 bg-white rounded-full p-3" />
      </TouchableOpacity>

      <String variant="body-sm" colorVariant="muted" className="px-10 text-center">
        {isUserImageGoogle
          ? t('on-boarding.step-1.description_google')
          : t('on-boarding.step-1.description')}
      </String>
    </WrapperScrollView>
  );
}
