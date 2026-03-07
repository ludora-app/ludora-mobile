import React from 'react'
import { StyleSheet } from 'react-native'
import { Box, Icon, String, Wrapper } from '@ludo/ui'

import COLORS from '@/constants/colors.contstants'
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component'

import ProfilHeaderActionsBlockUser from '../components/profil-header/profil-header-actions/profil-header-actions-block-user.component'

const styles = StyleSheet.create({
  selectedShadow: {
    boxShadow: '0 2px 4px #F1592440',
  },
})


export default function ProfilActionsFormsheet() {
  return (
    <Wrapper className='gap-4'>
      <FormSheetHeader />
      <Box className='gap-4'>
        <ProfilHeaderActionsBlockUser />
        <Box className='border border-primary/20 rounded-xl p-3 flex-row items-center gap-2' style={styles.selectedShadow}>
          <Icon name='shield-excalmation-solid' color={COLORS.primary} />
          <String>Signaler lutilisateur</String>
        </Box>
      </Box>
    </Wrapper>
  )
}