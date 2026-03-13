import { useToast } from '@chillui/ui';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, FormInput, ScreenLayout, String, WrapperKeyboardAwareScrollView, Wrapper, Icon } from '@ludo/ui';

import { useUserMe } from '@/queries/user-me.query';
import { useSafeArea } from '@/hooks/safe-area.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useSendContactMessage } from '@/api/hooks/send-contact-message.hook';

import SettingsHeader from '../components/settings-header.component';
import { contactSchema, MESSAGE_MAX_LENGTH, SUBJECT_MAX_LENGTH } from '../schemas/contact.schema';

export default function SettingsContactScreen() {
  const { t } = useTranslate();
  const { toast } = useToast();
  const { bottom } = useSafeArea();
  const schema = contactSchema(t);
  const { trackError } = useAnalytics();
  const { userMe } = useUserMe();
  const { mutateAsync: sendContactMessage } = useSendContactMessage();

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { subject: string; message: string }) => {
    try {
      await sendContactMessage({
        ...data,
        email: userMe?.email || '',
        name: `${userMe?.firstname} ${userMe?.lastname}`.trim(),
      });
      toast({
        message: t('settings.contact.success_message'),
        variant: 'success',
      });
      reset();
    } catch (error) {
      trackError({ error });
    }
  };

  return (
    <ScreenLayout>
      <WrapperKeyboardAwareScrollView
        grow
        px="none" keyboardShouldPersistTaps="handled"
        bounces={false}
        androidSafeAreaBottom={false}
      >
        <SettingsHeader titleKey="settings.contact.header_title" hasTopSafeArea hasHorizontalPadding />
        <Wrapper
          className="bg-background rounded-t-xl z-50 pt-5 gap-8 grow"
          style={{ paddingBottom: bottom + 40 }}
        >
          <Box className="gap-2">
            <Icon name="ludo-pen-border" className="size-28 self-center" />

            <String variant="body-2" colorVariant="muted" className="leading-6 text-center">
              {t('settings.contact.description')}
            </String>
          </Box>
          <Box className="gap-3">
            <FormInput
              control={control}
              name="subject"
              label={t('settings.contact.input_subject_label')}
              placeholder={t('settings.contact.input_subject_placeholder')}
              maxLength={SUBJECT_MAX_LENGTH}
              hasLengthCounter
            />
            <FormInput
              control={control}
              name="message"
              label={t('settings.contact.input_message_label')}
              placeholder={t('settings.contact.input_message_placeholder')}
              multiline
              inputContainerClassName="min-h-40"
              maxLength={MESSAGE_MAX_LENGTH}
              hasLengthCounter
            />
          </Box>
          <Button
            title={t('settings.contact.button_send')}
            onPress={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            size="lg"
            className="mt-4"
          />
        </Wrapper>
      </WrapperKeyboardAwareScrollView>
    </ScreenLayout>
  );
}
