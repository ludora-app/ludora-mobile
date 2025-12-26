import { Button } from '@ludo/ui';
import { useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { useEffect, useMemo, useState } from 'react';

import { ErrorResponse } from '@/api/orval.instance';

import { useSendVerificationCodeByEmail } from '../../reset-password/queries/send-verification-code.query';

const WAITING_TIME_TO_RESEND_CODE = 60; // seconds

type VerifyCodeSubmitButtonProps = {
  isLoading?: boolean;
  onSubmit: () => void;
  userEmail?: string;
  code?: string;
};

export default function VerifyCodeSubmitButton(props: VerifyCodeSubmitButtonProps) {
  const { code, isLoading, onSubmit, userEmail } = props;
  const { t } = useTranslate();
  const { isPending: isSendingVerificationCode, mutateAsync: sendVerificationCode } = useSendVerificationCodeByEmail();
  const { toast } = useToast();

  const [resendCodeTime, setResendCodeTime] = useState(WAITING_TIME_TO_RESEND_CODE);

  const isCodeValid = code && code.length > 0;
  const isButtonDisabled = !isCodeValid && resendCodeTime > 0;

  const buttonMessage = useMemo(() => {
    if (isCodeValid) {
      return t('common.send');
    }
    if (resendCodeTime > 0) {
      return t('auth.verify-code.resend_verification_code_timer', { timer: resendCodeTime });
    }
    return t('auth.verify-code.resend_verification_code');
  }, [isCodeValid, resendCodeTime, t]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (resendCodeTime > 0) {
      timer = setInterval(() => {
        setResendCodeTime(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendCodeTime]);

  const handleSendVerificationCode = async () => {
    try {
      await sendVerificationCode({ data: { email: userEmail } });
      setResendCodeTime(WAITING_TIME_TO_RESEND_CODE);
      toast({
        message: t('auth.verify-code.resend_verification_code_success'),
        variant: 'success',
      });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      console.log('error', errorResponse);
    }
  };

  const handleSubmit = () => {
    if (isCodeValid) {
      onSubmit();
      return;
    }
    if (resendCodeTime === 0 && !isCodeValid) {
      handleSendVerificationCode();
    }
  };

  return (
    <>
      <Button title={buttonMessage} onPress={handleSendVerificationCode} className="w-full" size="lg" />
      <Button
        title={buttonMessage}
        isDisabled={isButtonDisabled}
        onPress={handleSubmit}
        className="w-full"
        size="lg"
        isLoading={isLoading || isSendingVerificationCode}
      />
    </>
  );
}
