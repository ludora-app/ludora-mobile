import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { BoxRowCenter, String } from '@ludo/ui'
import { StyleSheet, TouchableOpacity } from 'react-native'

import ROUTES from '@/constants/routes.constants';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
  }
})

interface ProfilSection4Props {
  isMe: boolean;
  friendsCount: number;
  matchesCount: number;
}

export default function ProfilSection4(props: ProfilSection4Props) {
  const router = useRouter();
  const { t } = useTranslate();
  const { friendsCount, isMe, matchesCount } = props;

  return (
    <BoxRowCenter className='items-center justify-around p-2 rounded-xl bg-white' style={styles.shadow}>
      <TouchableOpacity className='items-center justify-center' onPress={() => router.navigate(ROUTES.SETTINGS.FRIENDS)} disabled={!isMe}>
        <String font="primaryBold">{friendsCount || 0}</String>
        <String font="primarySemiBold" variant="body-sm" colorVariant="muted">{t('common.friends')}</String>
      </TouchableOpacity>
      <TouchableOpacity className='items-center justify-center' onPress={() => router.navigate(ROUTES.SETTINGS.HISTORY)} disabled={!isMe}>
        <String font="primaryBold">{matchesCount || 0}</String>
        <String font="primarySemiBold" variant="body-sm" colorVariant="muted">{t('common.matches')}</String>
      </TouchableOpacity>
      {/* <BoxCenter>
        <String font="primaryBold">0</String>
        <String font="primarySemiBold" variant="body-sm" colorVariant="muted">{t('common.mvp')}</String>
      </BoxCenter> */}
    </BoxRowCenter>
  )
}