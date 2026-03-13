import { cn } from '@chillui/ui'
import { useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { useTranslate } from '@tolgee/react'
import { Box, BoxCenter, String, Wrapper, BoxRowCenterBetween, Icon, ScreenLayout, BoxGrow, ScrollView } from '@ludo/ui'

import { formatDate } from '@/utils/time.utils'
import ROUTES from '@/constants/routes.constants'
import COLORS from '@/constants/colors.contstants'
import { useUserMe } from '@/queries/user-me.query'
import { useSafeArea } from '@/hooks/safe-area.hook'
import { TIconsAll } from '@/constants/icons.constants'

import ProfilEditHeader from '../components/profil-edit/profil-edit-header.component'
import ProfilEditAvatar from '../components/profil-edit/profil-edit-avatar.component'

const styles = StyleSheet.create({
  shadow: {
    boxShadow: `0px 4px 4px ${COLORS.primary}40`,
  },
})

type DataItems = {
  labelKey: string
  route: string
  value: string
  icon: TIconsAll
  isMissing?: boolean
  iconColor: string
  show?: boolean
  iconClassname?: string
}

export default function ProfilEditScreen() {
  const { t } = useTranslate()
  const { bottom } = useSafeArea()
  const { isRefetching, refetch, userMe } = useUserMe()
  const { bio, birthdate, email, firstname, lastname, provider, sex: userSex } = userMe || {}


  const router = useRouter()

  const data: DataItems[] = [
    {
      icon: "stylus-pen-edit-regular",
      iconColor: "#000",
      labelKey: 'profil.profil-edit.name_info_title',
      route: ROUTES.PROFIL.EDIT_NAME,
      show: true,
      value: `${firstname} ${lastname}`
    },
    {
      icon: "stylus-pen-edit-regular",
      iconColor: "#000",
      isMissing: !bio,
      labelKey: 'profil.profil-edit.bio_info_title',
      route: ROUTES.PROFIL.EDIT_BIO,
      show: true,
      value: bio || t('profil.profil-edit.empty_bio')
    },
    {
      icon: "stylus-pen-edit-regular",
      iconColor: "#000",
      isMissing: !userSex,
      labelKey: 'profil.profil-edit.sex_info_title',
      route: ROUTES.PROFIL.EDIT_SEX,
      show: true,
      value: userSex ? t(`common.${userSex}`) : t('profil.profil-edit.empty_sex')
    },
    {
      icon: provider === "GOOGLE" ? "google-colored" : "stylus-pen-edit-regular",
      iconClassname: provider === "GOOGLE" ? "mr-2" : "",
      iconColor: provider === "GOOGLE" ? undefined : "#000",
      labelKey: 'profil.profil-edit.email_info_title',
      route: provider === "LUDORA" && ROUTES.PROFIL.EDIT_EMAIL,
      show: true,
      value: email
    },
    {
      icon: "stylus-pen-edit-regular",
      iconColor: "#000",
      isMissing: !birthdate,
      labelKey: 'profil.profil-edit.birthdate_info_title',
      route: ROUTES.PROFIL.EDIT_BIRTHDATE,
      show: true,
      value: birthdate ? formatDate({ date: birthdate }) : t('profil.profil-edit.empty_birthdate')
    },
    {
      icon: "stylus-pen-edit-regular",
      iconColor: "#000",
      labelKey: 'profil.profil-edit.password_info_title',
      route: ROUTES.PROFIL.EDIT_PASSWORD,
      show: provider === "LUDORA",
      value: '********'
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
                item.show && (
                  <BoxRowCenterBetween key={index} className='gap-1'>
                    <BoxGrow>
                      <String font="primaryBold" variant="body-2">{t(item.labelKey)}</String>
                      <String truncate colorVariant={item?.isMissing ? 'ring' : 'black'}>{item.value}</String>
                    </BoxGrow>
                    <Icon
                      name={item.icon}
                      color={item?.iconColor}
                      onPress={() => item.route && router.push(item.route)}
                      hasPressEffect={!!item.route}
                      className={cn(item.iconClassname)}
                    />
                  </BoxRowCenterBetween>
                )
              ))}
            </Box>
          </Box>
        </Wrapper>
      </ScrollView>
    </ScreenLayout>
  )
}