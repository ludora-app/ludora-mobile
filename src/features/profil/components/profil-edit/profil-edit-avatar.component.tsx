import { isString } from 'radash';
import { Pressable } from 'react-native';
import { useEffect, useMemo } from 'react'
import { BoxAbsolute, Icon } from '@ludo/ui';
import { ImagePickerAsset } from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { parse } from '@/utils/json.utils';
import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { useUserMe } from '@/queries/user-me.query';
import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useUpdateUserMe } from '@/queries/update-user-me.query';
import { cn, LoadingIndicator } from '@/components/chill-ui-library';
import AvatarMe from '@/components/ui/me/avatarMe/avatar-me.component';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import { ReturnStackParamList, RootStackParamList } from '@/types/routes-params.types';


type LocalSearchParams = RootStackParamList[typeof ROUTES.IMAGE_PICKER.INDEX];

type ReturnParams = ReturnStackParamList[typeof ROUTES.IMAGE_PICKER.INDEX];

export default function ProfilEditAvatar() {
  const { userMe } = useUserMe()
  const { imageUrl } = userMe || {}
  const { isPending: isUpdatingUserMe, mutateAsync: updateUserMe } = useUpdateUserMe();

  const router = useRouter();

  const { trackError, trackEvent } = useAnalytics();

  const { images } = useLocalSearchParams<ReturnParams>();

  const parsedSelectedImages: ImagePickerAsset[] = useMemo(() => {
    if (!images || !isString(images)) return [];
    try {
      return parse(images);
    } catch {
      return [];
    }
  }, [images]);

  const handleUpdateUserMeAvatar = async (file: Blob) => {
    try {
      trackEvent({
        data: { is_avatar_added: !imageUrl, is_avatar_updated: !!imageUrl },
        eventName: ANALYTICS_EVENTS.PROFIL.PROFIL_EDIT_AVATAR_SUCCESS
      });
      await updateUserMe({ file });
    } catch (error) {
      const errorResponse = error as ErrorResponse
      trackError({ error });
      trackEvent({ data: { error_message: errorResponse.api_error_detail }, eventName: ANALYTICS_EVENTS.PROFIL.PROFIL_EDIT_AVATAR_FAILED });
    }
  }


  useEffect(() => {
    if (parsedSelectedImages && parsedSelectedImages.length > 0) {
      const asset = parsedSelectedImages[0];
      const file = {
        name: asset.fileName ?? 'avatar.jpg',
        type: asset.mimeType ?? 'image/jpeg',
        uri: asset.uri,
      } as unknown as Blob;
      handleUpdateUserMeAvatar(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const handleSelectImage = () => {
    const params: LocalSearchParams = {
      goBackPath: "/profil/profil-edit",
    };

    router.push({
      params,
      pathname: '/image-picker',
    });
  };
  return (
    <Pressable onPress={handleSelectImage} className='relative items-center justify-center overflow-hidden' disabled={isUpdatingUserMe}>
      <AvatarMe size="2xl" className={cn({ 'opacity-50': isUpdatingUserMe })} />
      <BoxAbsolute className='right-0 bottom-0 bg-white rounded-full p-2'>
        <Icon name='e-pen-regular' color={COLORS.primary} />
      </BoxAbsolute>
      <BoxAbsolute className='bg-black/30 flex-1 rounded-lg' />
      {isUpdatingUserMe &&
        <BoxAbsolute>
          <LoadingIndicator name="swing" color={COLORS.primary} />
        </BoxAbsolute>}
    </Pressable>
  )
}