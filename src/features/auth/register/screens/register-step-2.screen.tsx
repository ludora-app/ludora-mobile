import { z } from 'zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Box, useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { String, Button, FormInput, WrapperKeyboardAwareScrollView } from '@ludo/ui';

import ROUTES from '@/constants/routes.constants';
import { ErrorResponse } from '@/api/orval.instance';
import { NAME_REGEX } from '@/utils/zod-schemas.utils';
import { useAuthHelpers } from '@/hooks/auth-helpers.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import FormDatePickerInput from '@/components/ludo-ui/components/form/form-date-picker-input.component';
import HeaderGoBack from '@/components/ui/navigation/header-go-back/components/header-go-back.component';

import { useRegister } from '../queries/register.hook';
import { formSchema } from '../schemas/register-step-2.schema';

const EMAIL_ALREADY_EXISTS_ERROR_MESSAGE = 'User already exists';

export default function RegisterStep2Screen() {
  const router = useRouter();
  const { isPending: registerPending, mutateAsync: registerUser } = useRegister();
  const { t } = useTranslate();
  const { login } = useAuthHelpers();
  const { toast } = useToast();
  const { trackError, trackEvent } = useAnalytics();
  const registerFormSchema = formSchema(t);
  const {
    control,
    handleSubmit,
    trigger,
  } = useForm<z.infer<typeof registerFormSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    try {
      const response = await registerUser({
        data: {
          ...data,
          birthdate: data.birthdate.toISOString(),
          type: 'USER',
        },
      });
      const accessToken = response?.data.accessToken;
      const refreshToken = response?.data.refreshToken;
      login({ accessToken, refreshToken });
      trackEvent({
        data: { flow: 'Authentication', method: 'email' },
        eventName: 'signup_success',
      });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackEvent({
        data: { error_message: errorResponse.api_error_detail, flow: 'Authentication', method: 'email' },
        eventName: 'signup_failed',
      });
      if (errorResponse.api_error_detail === EMAIL_ALREADY_EXISTS_ERROR_MESSAGE) {
        toast({
          message: t('auth.register.email_already_exists'),
          variant: 'error',
        });
      } else {
        trackError({ error });
      }
    }
  };

  return (
    <>
      <HeaderGoBack title={t('auth.register-step-2.title')} titleProps={{ variant: 'title-1' }} hasTopSafeArea />
      <WrapperKeyboardAwareScrollView hasSafeArea edges={['bottom']} contentContainerClassName='pt-5'>
        <Box className="mb-5 flex-1 gap-5">
          <Box className="flex-row gap-4">
            <Box className="flex-1">
              <FormInput
                name="lastname"
                placeholder={t('common.input_lastname_placeholder')}
                control={control}
                label={t('common.input_lastname_label')}
                customRegex={NAME_REGEX}
              />
            </Box >
            <Box className="flex-1">
              <FormInput
                name="firstname"
                placeholder={t('common.input_firstname_placeholder')}
                control={control}
                label={t('common.input_firstname_label')}
                customRegex={NAME_REGEX}
              />
            </Box>
          </Box >
          <FormDatePickerInput
            name="birthdate"
            control={control}
            placeholder={t('common.input_birthdate_placeholder')}
            label={t('common.input_birthdate_label')}
            onChange={() => trigger('birthdate')}
          />
          <FormInput
            name="email"
            placeholder={t('common.input_email_placeholder')}
            control={control}
            label={t('common.input_email_label')}
          />
          <FormInput
            name="password"
            onChangeText={() => trigger('password')}
            placeholder={t('common.input_password_placeholder')}
            control={control}
            label={t('common.input_password_label')}
            secureTextEntry
          />
          <FormInput
            name="confirmPassword"
            placeholder={t('common.input_confirm_password_placeholder')}
            control={control}
            label={t('common.input_confirm_password_label')}
            secureTextEntry
          />
          <Button
            title={t('auth.register-step-2.button_title')}
            onPress={handleSubmit(onSubmit)}
            className="mt-4 w-full"
            // isDisabled={!isValid}
            isLoading={registerPending}
          />
        </Box>
        <String size="sm" useFastText={false} onPress={() => { }}>
          {t('auth.register-step-2.acceptance_part_1')}
          <String
            size="sm"
            useFastText={false}
            font="primaryBold"
            className="underline"
            onPress={() => router.navigate(ROUTES.LEGAL.CGU_MENTIONS)}
          >
            {t('auth.register-step-2.acceptance_part_2')}
          </String>
          {t('auth.register-step-2.acceptance_part_3')}
          <String
            size="sm"
            useFastText={false}
            font="primaryBold"
            className="underline"
            onPress={() => router.navigate(ROUTES.LEGAL.CGV)}
          >
            {t('auth.register-step-2.acceptance_part_4')}
          </String>
          {t('auth.register-step-2.acceptance_part_5')}
          <String
            size="sm"
            useFastText={false}
            font="primaryBold"
            className="underline"
            onPress={() => router.navigate(ROUTES.LEGAL.NON_DISCRIMINATION)}
          >
            {t('auth.register-step-2.acceptance_part_6')}
          </String>
          {t('auth.register-step-2.acceptance_part_7')}
          <String
            size="sm"
            useFastText={false}
            font="primaryBold"
            className="underline"
            onPress={() => router.navigate(ROUTES.LEGAL.PRIVACY)}
          >
            {t('auth.register-step-2.acceptance_part_8')}
          </String>
        </String>
      </WrapperKeyboardAwareScrollView>
    </>
  );
}
