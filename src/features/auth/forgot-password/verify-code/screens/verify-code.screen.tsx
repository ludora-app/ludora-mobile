import { TextInput } from 'react-native';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useRef, useState } from 'react';
import { cn, InputMessage, useToast } from '@chillui/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WrapperSafeAreaView, FormInput, String, BoxRow } from '@ludo/ui';

import ROUTES from '@/constants/ROUTES';
import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

import { useVerifyCode } from '../queries/verify-code.query';
import { VERIFY_CODE_ERRORS } from '../utils/verify-code-errors.utils';
import AuthHeader from '../../components/auth-header/ auth-header.component';
import { goToNextInput, goToPreviousInput } from '../utils/verify-code.utils';
import { formSchema, VerifyCodeFormData } from '../schemas/verify-code.schema';
import VerifyCodeSubmitButton from '../components/verify-code-submit-button.component';
import ContentWapper from '../../components/content-wrapper/content-wrapper.component';

const VerifyCodeFieldNames = ['code1', 'code2', 'code3', 'code4', 'code5', 'code6'] as const;

export default function VerifyCodeScreen() {
  const router = useRouter();
  const { t } = useTranslate();
  const { toast } = useToast();
  const { email } = useLocalSearchParams();
  const { trackError, trackEvent } = useAnalytics();
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    watch,
  } = useForm<VerifyCodeFormData>({
    resolver: zodResolver(formSchema),
  });

  const inputRefs = useRef<TextInput[]>([]);
  const { isPending: isVerifyingCode, mutateAsync: verifyCode } = useVerifyCode();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const values = watch();
  const parsedValues = Object.values(values).join('');

  const refInputCallback = useCallback((ref: TextInput | null) => {
    if (ref && !inputRefs.current.includes(ref)) {
      inputRefs.current.push(ref);
    }
  }, []);

  const VerifyCodeFields = VerifyCodeFieldNames.map((name, index) => ({
    name,
    placeholder: `${index + 1}`,
  }));

  const onSubmit = async (data: VerifyCodeFormData) => {
    trackEvent({
      eventName: 'reset_password_verify_code_requested',
    });
    const code = Object.values(data).join('');
    try {
      const response = await verifyCode({ data: { code, email: email?.toString() ?? '' } });
      trackEvent({
        eventName: 'reset_password_verify_code_success',
      });
      return router.replace({ params: { resetToken: response.resetToken }, pathname: ROUTES.AUTH.NEW_PASSWORD });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackEvent({
        eventName: 'reset_password_verify_code_failed',
        properties: {
          error_message: errorResponse.api_error_detail,
        },
      });
      let errorMessage: string = 'common.error_generic';
      if (errorResponse.api_error_detail === VERIFY_CODE_ERRORS.CODE_INCORRECT) {
        errorMessage = 'auth.verify-code.incorrect_code';
      } else if (errorResponse.api_error_detail === VERIFY_CODE_ERRORS.EXPIRED_CODE) {
        errorMessage = 'auth.verify-code.expired_code';
      } else if (errorResponse.api_error_detail === VERIFY_CODE_ERRORS.EXCEEDED_ATTEMPTS) {
        errorMessage = 'auth.verify-code.exceeded_attempts';
      } else {
        trackError({
          error,
          showToast: false,
        });
      }
      return toast({ message: t(errorMessage), variant: 'error' });
    }
  };

  return (
    <WrapperSafeAreaView edges={['bottom']}>
      <AuthHeader title="auth.verify-code.title">
        <String>
          {t('auth.verify-code.description')}
          <String font="primaryBold">{email?.toString() ?? ''}</String>
        </String>
      </AuthHeader>
      <ContentWapper>
        <BoxRow className="gap-2">
          {VerifyCodeFields.map((field, index) => (
            <FormInput
              ref={refInputCallback}
              key={index}
              control={control}
              name={field.name}
              placeholder={field.placeholder}
              hasMessageError={false}
              className="flex-1"
              onChangeText={(value: string) => {
                if (value.length >= 1 && index < VerifyCodeFieldNames.length - 1) {
                  goToNextInput({ index, inputRefs });
                }
              }}
              inputContainerClassName={cn('justify-center items-center p-0', {
                'border-primary': focusedIndex === index,
              })}
              inputFieldClassName="text-center"
              size="xl"
              keyboardType="numeric"
              allow="numbers"
              maxLength={1}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(current => (current === index ? null : current))}
              onKeyPress={event => {
                const value = getValues()[field.name];
                goToPreviousInput({ e: event, index, inputRefs, value });
              }}
            />
          ))}
        </BoxRow>
        {Object.keys(errors).length > 0 && (
          <InputMessage title={t('auth.verify-code.resend_code_input_error_message')} colorVariant="error" />
        )}
      </ContentWapper>
      <VerifyCodeSubmitButton
        isLoading={isVerifyingCode}
        onSubmit={handleSubmit(onSubmit)}
        userEmail={email?.toString() ?? ''}
        code={parsedValues}
      />
    </WrapperSafeAreaView>
  );
}
