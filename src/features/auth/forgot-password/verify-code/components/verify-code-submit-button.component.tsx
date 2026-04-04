import { Button } from '@ludo/ui';
import { useToast } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

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
  const { trackError, trackEvent } = useAnalytics();

  const [resendCodeTime, setResendCodeTime] = useState(WAITING_TIME_TO_RESEND_CODE);

  const isCodeValid = code && code.length > 0;
  const isShowingResendCountdown = resendCodeTime > 0;
  const isButtonDisabled = !isCodeValid && isShowingResendCountdown;

  const buttonMessage = useMemo(() => {
    if (isCodeValid) {
      return t('common.send');
    }
    if (resendCodeTime > 0) {
      return t('auth.verify-code.resend_verification_code_timer', { timer: resendCodeTime });
    }
    return t('auth.verify-code.resend_verification_code');
  }, [isCodeValid, resendCodeTime, t]);

  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (resendCodeTime > 0) {
      countdownIntervalRef.current = setInterval(() => {
        setResendCodeTime(prev => {
          if (prev <= 1) {
            if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [resendCodeTime]);

  const handleSendVerificationCode = async () => {
    try {
      await sendVerificationCode({ email: userEmail ?? '' });
      setResendCodeTime(WAITING_TIME_TO_RESEND_CODE);
      trackEvent({
        eventName: 'reset_password_verify_code_resend_success',
      });
      toast({
        message: t('auth.verify-code.resend_verification_code_success'),
        variant: 'success',
      });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      trackEvent({
        data: { error_message: errorResponse.api_error_detail ?? 'unknow error' },
        eventName: 'reset_password_verify_code_resend_failed',
      });
      trackError({ error });
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
    <Button
      title={buttonMessage}
      isDisabled={isButtonDisabled}
      hasDisabledOpacity
      onPress={handleSubmit}
      className="w-full"
      isLoading={isLoading || isSendingVerificationCode}
    />
  );
}
