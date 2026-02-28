import { useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { useTranslate } from '@tolgee/react'
import { Box, BoxCenter, String, Wrapper, BoxRowCenterBetween, Icon, ScreenLayout, BoxGrow, ScrollView } from '@ludo/ui'

import { formatDate } from '@/utils/time.utils'
import ROUTES from '@/constants/routes.constants'
import COLORS from '@/constants/colors.contstants'
import { useUserMe } from '@/queries/user-me.query'
import { useSafeArea } from '@/hooks/safe-area.hook'

import ProfilEditHeader from '../components/profil-edit/profil-edit-header.component'
import ProfilEditAvatar from '../components/profil-edit/profil-edit-avatar.component'

const styles = StyleSheet.create({
  shadow: {
    boxShadow: `0px 4px 4px ${COLORS.primary}40`,
  },
})

export default function ProfilEditScreen() {
  const { t } = useTranslate()
  const { bottom } = useSafeArea()
  const { isRefetching, refetch, userMe } = useUserMe()
  const { bio, birthdate, email, firstname, lastname, sex: userSex } = userMe || {}
  const router = useRouter()

  const data = [
    {
      labelKey: 'profil.profil-edit.name_info_title',
      route: ROUTES.PROFIL.EDIT_NAME,
      value: `${firstname} ${lastname}`,
    },
    {
      isMissing: !bio,
      labelKey: 'profil.profil-edit.bio_info_title',
      route: ROUTES.PROFIL.EDIT_BIO,
      value: bio || t('profil.profil-edit.empty_bio'),
    },
    {
      isMissing: !userSex,
      labelKey: 'profil.profil-edit.sex_info_title',
      route: ROUTES.PROFIL.EDIT_SEX,
      value: userSex ? t(`common.${userSex}`) : t('profil.profil-edit.empty_sex'),
    },
    {
      labelKey: 'profil.profil-edit.email_info_title',
      route: ROUTES.PROFIL.EDIT_EMAIL,
      value: email,
    },
    {
      isMissing: !birthdate,
      labelKey: 'profil.profil-edit.birthdate_info_title',
      route: ROUTES.PROFIL.EDIT_BIRTHDATE,
      value: birthdate ? formatDate({ date: birthdate }) : t('profil.profil-edit.empty_birthdate'),
    },
    {
      labelKey: 'profil.profil-edit.password_info_title',
      route: ROUTES.PROFIL.EDIT_PASSWORD,
      value: '********',
    },
  ]


  return (
    <ScreenLayout>
      <ScrollView
        hasRefreshControl
        isRefetching={isRefetching}
        refetch={refetch}
      >
        <ProfilEditHeader />
        <Wrapper fill className='bg-background rounded-t-xl z-50 pt-10' style={{ paddingBottom: bottom }}>
          <Box className='border border-primary/20 rounded-xl p-5 gap-5 bg-white' style={styles.shadow}>
            <BoxCenter>
              <ProfilEditAvatar />
            </BoxCenter>
            <Box className='gap-5'>
              {data.map((item, index) => (
                <BoxRowCenterBetween key={index} className='gap-1'>
                  <BoxGrow>
                    <String font="primaryBold" variant="body-2">{t(item.labelKey)}</String>
                    <String truncate colorVariant={item?.isMissing ? 'ring' : 'black'}>{item.value}</String>
                  </BoxGrow>
                  <Icon name='stylus-pen-edit-regular' color='#000' onPress={() => router.push(item.route)} />
                </BoxRowCenterBetween>
              ))}
            </Box>
          </Box>
        </Wrapper>
      </ScrollView>
    </ScreenLayout>
  )
}