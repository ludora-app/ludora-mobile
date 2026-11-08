import { cn } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
// Direct paths, not `@ludo/ui`: the ludo-ui List imports this component, so the barrel would create a cycle
import { Icon } from '@/components/ludo-ui/components/icon';
import { BoxCenter } from '@/components/ludo-ui/components/box';
import { Button } from '@/components/ludo-ui/components/button';
import { String } from '@/components/ludo-ui/components/string/string.component';

export type ErrorResultProps = {
  className?: string;
  isRetrying?: boolean;
  messageKey?: string;
  onRetry?: () => void;
};

export const ErrorResult = (props: ErrorResultProps) => {
  const { className, isRetrying = false, messageKey = 'common.error_generic', onRetry } = props;
  const { t } = useTranslate();

  return (
    <BoxCenter className={cn('gap-4 py-6', className)}>
      <Icon name="ludo-cry" className="size-28" />
      <String variant="body-sm" font="primarySemiBold" colorVariant="muted" className="text-center">
        {t(messageKey)}
      </String>
      {onRetry && (
        <Button title={t('common.retry')} variant="outlined" size="sm" isLoading={isRetrying} onPress={onRetry} />
      )}
    </BoxCenter>
  );
};
