
import { useTranslate } from '@tolgee/react'
import { PropsWithChildren, useEffect, useState } from 'react'
import { Box, Icon, String, Button, IconProps } from '@ludo/ui'
import { Dialog as DialogChillUi, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@chillui/ui'

import COLORS from '@/constants/colors.contstants'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'


type DialogProps = {
  onConfirmPromise?: () => Promise<void>
  onConfirm?: () => void
  isLoading?: boolean
  onCancel?: () => void
  title?: string
  content?: string
  iconProps?: IconProps
  showIcon?: boolean
  source: string
  confirmButtonTitleKey: string
}

export default function DialogConfirm(props: PropsWithChildren<DialogProps>) {
  const {
    children,
    confirmButtonTitleKey,
    content,
    iconProps,
    isLoading,
    onCancel,
    onConfirm,
    onConfirmPromise,
    showIcon,
    source,
    title } = props
  const [open, setOpen] = useState(false)
  const { trackEvent } = useAnalytics()
  const { t } = useTranslate()

  useEffect(() => {
    if (open) {
      trackEvent({ data: { source }, eventName: 'dialog_confirm_open' })
    }
  }, [open, source, trackEvent])

  const handleConfirm = async () => {
    if (onConfirmPromise) {
      await onConfirmPromise()
    }
    if (onConfirm) {
      onConfirm()
    }
    setOpen(false)
  }

  const handleCancel = () => {
    onCancel?.()
    setOpen(false)
  }

  return (
    <DialogChillUi open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='items-center justify-center'>
          <DialogTitle font="primaryBold">{title}</DialogTitle>
          <DialogClose className='absolute right-3'>
            <Icon name="close-circle-regular" color={COLORS.primary} />
          </DialogClose>
        </DialogHeader>
        <Box className='items-center py-4 px-3'>
          {showIcon && <Icon name='ludo-cry' className='size-20' {...iconProps} />}
          <String className='text-center' font="primarySemiBold">
            {content}
          </String>
        </Box>

        <DialogFooter className='gap-2 py-3'>
          <Button
            title={t('common.button_cancel')}
            colorVariant="primary"
            variant="contained"
            className='flex-2'
            size="sm"
            onPress={handleCancel}
          />
          <Button
            title={t(confirmButtonTitleKey)}
            colorVariant="danger"
            variant="outlined"
            className='flex-1'
            size="sm"
            onPress={handleConfirm}
            isLoading={isLoading}
          />

        </DialogFooter>
      </DialogContent>
    </DialogChillUi>
  )
}