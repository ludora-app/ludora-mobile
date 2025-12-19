import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useRef, useState } from 'react';
import { cn, InputMessage, useToast } from '@chillui/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WrapperSafeAreaView, FormInput, String, BoxRow, Box } from '@ludo/ui';
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData } from 'react-native';

import ROUTES from '@/constants/ROUTES';

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
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<VerifyCodeFormData>({
    resolver: zodResolver(formSchema),
  });

  const inputRefs = useRef<TextInput[]>([]);
  const { isPending: isVerifyingCode, mutateAsync: verifyCode } = useVerifyCode();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

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
    const code = Object.values(data).join('');
    try {
      // const response = await verifyCode({ data: { code, email: 'amir.398@hotmail.fr' } });
      return router.push({ params: { resetToken: '' }, pathname: ROUTES.AUTH.NEW_PASSWORD });
    } catch (error) {
      let errorMessage: string = 'common.error_generic';
      if (error.message === VERIFY_CODE_ERRORS.CODE_INCORRECT) {
        errorMessage = 'auth.verify-code.incorrect_code';
      }
      if (error.message === VERIFY_CODE_ERRORS.EXPIRED_CODE) {
        errorMessage = 'auth.verify-code.expired_code';
      }
      if (error.message === VERIFY_CODE_ERRORS.EXCEEDED_ATTEMPTS) {
        errorMessage = 'auth.verify-code.exceeded_attempts';
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
              onKeyPress={(event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
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
        focusedIndex={focusedIndex}
        isLoading={isVerifyingCode}
        onSubmit={handleSubmit(onSubmit)}
      />
    </WrapperSafeAreaView>
  );
}
