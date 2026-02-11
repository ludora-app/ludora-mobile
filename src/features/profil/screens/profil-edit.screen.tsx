import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'
import { ScrollView, StyleSheet } from 'react-native'
import { Box, BoxCenter, String, Wrapper, BoxRowCenterBetween, Icon, ScreenLayout } from '@ludo/ui'

import COLORS from '@/constants/COLORS'
import { formatDate } from '@/utils/date.utils'
import ROUTES from '@/constants/routes.constants'
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
  const { userMe } = useUserMe()
  const { bio, birthdate, email, firstname, lastname, sex: userSex } = userMe || {}
  const router = useRouter()

  const data = [
    {
      label: t('profil.profil-edit.name_info_title'),
      route: ROUTES.PROFIL.EDIT_NAME,
      value: `${firstname} ${lastname}`,
    },
    {
      label: t('profil.profil-edit.bio_info_title'),
      route: ROUTES.PROFIL.EDIT_BIO,
      value: bio || t('profil.profil-edit.empty_bio'),
    },
    {
      label: t('profil.profil-edit.sex_info_title'),
      route: ROUTES.PROFIL.EDIT_SEX,
      value: t(`common.${userSex}`) || t('profil.profil-edit.empty_sex'),
    },
    {
      label: t('profil.profil-edit.email_info_title'),
      route: ROUTES.PROFIL.EDIT_EMAIL,
      value: email,
    },
    {
      label: t('profil.profil-edit.birthdate_info_title'),
      route: ROUTES.PROFIL.EDIT_BIRTHDATE,
      value: formatDate({ date: birthdate }),
    },
    {
      label: t('profil.profil-edit.password_info_title'),
      route: ROUTES.PROFIL.EDIT_PASSWORD,
      value: '********',
    },
  ]

  return (
    <ScreenLayout>
      <ScrollView
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        contentContainerClassName="grow"
      >
        <ProfilEditHeader />
        <Wrapper fill className='bg-background rounded-t-xl z-50 pt-10' style={{ paddingBottom: bottom }}>
          <Box className='border border-primary/20 rounded-xl p-5 gap-5 bg-white' style={styles.shadow}>
            <BoxCenter>
              <ProfilEditAvatar />
            </BoxCenter>
            <Box className='gap-5'>
              {data.map((item, index) => (
                <BoxRowCenterBetween key={index}>
                  <Box>
                    <String font="primaryBold" variant="body-2">{item.label}</String>
                    <String>{item.value}</String>
                  </Box>
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