import { useTranslate } from '@tolgee/react';
import { GlassView } from 'expo-glass-effect';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Box, Icon, String, Button, IconProps } from '@ludo/ui';
import {
  cn,
  Dialog as DialogChillUi,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@chillui/ui';

import COLORS from '@/constants/colors.contstants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

type DialogProps = {
  onConfirmPromise?: () => Promise<void>;
  onConfirm?: () => void;
  isLoading?: boolean;
  onCancel?: () => void;
  title?: string;
  content?: string;
  iconProps?: IconProps;
  showIcon?: boolean;
  source: string;
  confirmButtonTitleKey: string;
  centerContent?: boolean;
  priority?: 'confirm' | 'cancel';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function DialogConfirm(props: PropsWithChildren<DialogProps>) {
  const {
    centerContent,
    children,
    confirmButtonTitleKey,
    content,
    iconProps,
    isLoading,
    onCancel,
    onConfirm,
    onConfirmPromise,
    onOpenChange: onOpenChangeProp,
    open: openProp,
    priority = 'cancel',
    showIcon,
    source,
    title,
  } = props;
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;
  const setOpen = isControlled ? (onOpenChangeProp ?? (() => {})) : setInternalOpen;
  const { trackEvent } = useAnalytics();
  const { t } = useTranslate();

  useEffect(() => {
    if (open) {
      trackEvent({ data: { source }, eventName: 'dialog_confirm_open' });
    }
  }, [open, source, trackEvent]);

  const handleConfirm = async () => {
    if (onConfirmPromise) {
      await onConfirmPromise();
    }
    if (onConfirm) {
      onConfirm();
    }
    setOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <DialogChillUi open={open} onOpenChange={setOpen}>
      {children && (
        <DialogTrigger as="pressable" asChild>
          {children}
        </DialogTrigger>
      )}
      <DialogContent className="overflow-hidden rounded-2xl border-0 bg-transparent">
        <GlassView className="bg-white">
          <DialogHeader className="items-center justify-center">
            <Box className="flex-1 items-center justify-center px-8">
              <String font="primaryBold" colorVariant="primary" truncate>
                {title}
              </String>
            </Box>
            <DialogClose className="absolute right-3">
              <Icon name="close-circle-regular" color={COLORS.primary} />
            </DialogClose>
          </DialogHeader>
          <Box className="items-center px-3 py-4">
            {showIcon && <Icon name="ludo-cry" className="size-20" {...iconProps} />}
            <String className={cn({ 'text-center': centerContent })} font="primarySemiBold">
              {content}
            </String>
          </Box>

          <DialogFooter className="gap-2 py-3">
            <Button
              title={t('common.button_cancel')}
              colorVariant="primary"
              variant={priority === 'cancel' ? 'contained' : 'outlined'}
              className={cn('flex-2', priority === 'confirm' && 'flex-1')}
              size="sm"
              onPress={handleCancel}
            />
            <Button
              title={t(confirmButtonTitleKey)}
              colorVariant="danger"
              variant={priority === 'confirm' ? 'contained' : 'outlined'}
              className={cn('flex-1', priority === 'confirm' && 'flex-2')}
              loaderProps={{
                color: priority === 'confirm' ? '#FFF' : COLORS.danger,
              }}
              size="sm"
              onPress={handleConfirm}
              isLoading={isLoading}
            />
          </DialogFooter>
        </GlassView>
      </DialogContent>
    </DialogChillUi>
  );
}
