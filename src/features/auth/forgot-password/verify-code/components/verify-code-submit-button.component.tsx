import { Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { useEffect, useMemo, useState } from 'react';

const WAITING_TIME_TO_RESEND_CODE = 60; // seconds

type VerifyCodeSubmitButtonProps = {
  focusedIndex?: number;
  isLoading?: boolean;
  onSubmit: () => void;
};

export default function VerifyCodeSubmitButton(props: VerifyCodeSubmitButtonProps) {
  const { focusedIndex, isLoading, onSubmit } = props;
  const { t } = useTranslate();

  const [resendCodeTime, setResendCodeTime] = useState(WAITING_TIME_TO_RESEND_CODE);

  const isButtonDisabled = focusedIndex === null && resendCodeTime > 0;

  const buttonMessage = useMemo(() => {
    if (focusedIndex !== null) {
      return t('common.send');
    }
    if (resendCodeTime > 0) {
      return t('auth.verify-code.resend_verification_code_timer', { timer: resendCodeTime });
    }
    return t('auth.verify-code.resend_verification_code');
  }, [focusedIndex, resendCodeTime, t]);

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
    // eslint-disable-next-line
  }, []);

  return (
    <Button
      title={buttonMessage}
      isDisabled={isButtonDisabled}
      onPress={onSubmit}
      className="w-full"
      size="lg"
      isLoading={isLoading}
    />
  );
}
