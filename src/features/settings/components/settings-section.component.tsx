import { PropsWithChildren } from 'react'
import { Box, Separator, String } from '@ludo/ui'

interface SettingsSectionProps extends PropsWithChildren {
  title: string
  showSeparator?: boolean
}

export default function SettingsSection(props: SettingsSectionProps) {
  const { children, showSeparator, title } = props

  return (
    <Box>
      <String
        font="primaryBold"
        variant="body-1"
        className='text-gray-400 uppercase mb-2'
      >
        {title}
      </String>
      <Box className='bg-white rounded-xl px-4'>
        {children}
      </Box>
      {showSeparator && <Separator className='my-4' />}
    </Box>
  )
}
