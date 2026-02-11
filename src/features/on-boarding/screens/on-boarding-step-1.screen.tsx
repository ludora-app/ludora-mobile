import { isString } from 'radash';
import { useEffect, useMemo } from 'react';
import { useTranslate } from '@tolgee/react';
import { TouchableOpacity } from 'react-native';
import { ImagePickerAsset } from 'expo-image-picker';
import { Image, String, WrapperScrollView } from '@ludo/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { parse } from '@/utils/json.utils';
import ROUTES from '@/constants/routes.constants';
import { ReturnStackParamList, RootStackParamList } from '@/types/routes-params.types';

import { useOnBoardingStore } from '../stores/on-boarding.store';

type LocalSearchParams = RootStackParamList[typeof ROUTES.IMAGE_PICKER.INDEX];

type ReturnParams = ReturnStackParamList[typeof ROUTES.IMAGE_PICKER.INDEX];

export default function OnBoardingStep1Screen() {
  const { t } = useTranslate();
  const router = useRouter();
  const profilePicture = useOnBoardingStore(state => state.profilePicture);
  const setProfilePicture = useOnBoardingStore(state => state.setProfilePicture);
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
      setProfilePicture(parsedSelectedImages[0]);
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
    <WrapperScrollView contentContainerClassName="gap-8 pt-8">
      <String variant="body-3" font="primaryBold" className="text-center">
        {t('on-boarding.step-1.title')}
      </String>

      <TouchableOpacity
        className="border-primary aspect-square size-3/6 items-center justify-center self-center overflow-hidden rounded-lg border border-dotted"
        onPress={handleSelectImage}
      >
        {profilePicture ? (
          <Image source={{ uri: profilePicture?.uri }} className="size-full" />
        ) : (
          <String variant="title-3" colorVariant="primary" font="primaryBold">
            +
          </String>
        )}
      </TouchableOpacity>

      <String variant="body-sm" colorVariant="muted" className="px-10 text-center">
        {t('on-boarding.step-1.description')}
      </String>
    </WrapperScrollView>
  );
}
