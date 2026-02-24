import { StyleSheet } from 'react-native'
import { useTranslate } from '@tolgee/react';
import { BoxCenter, BoxRowCenter, String } from '@ludo/ui'

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
  }
})

interface ProfilSection4Props {
  friendsCount: number;
  matchesCount: number;
}

export default function ProfilSection4(props: ProfilSection4Props) {
  const { t } = useTranslate();
  const { friendsCount, matchesCount } = props;

  return (
    <BoxRowCenter className='items-center justify-around p-2 rounded-xl bg-white' style={styles.shadow}>
      <BoxCenter>
        <String font="primaryBold">{friendsCount || 0}</String>
        <String font="primarySemiBold" variant="body-sm" colorVariant="muted">{t('common.friends')}</String>
      </BoxCenter>
      <BoxCenter>
        <String font="primaryBold">{matchesCount || 0}</String>
        <String font="primarySemiBold" variant="body-sm" colorVariant="muted">{t('common.matches')}</String>
      </BoxCenter>
      <BoxCenter>
        <String font="primaryBold">0</String>
        <String font="primarySemiBold" variant="body-sm" colorVariant="muted">{t('common.mvp')}</String>
      </BoxCenter>
    </BoxRowCenter>
  )
}