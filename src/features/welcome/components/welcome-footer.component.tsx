import { Button, Wrapper } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

export default function WelcomeFooter() {
  const { t } = useTranslate();

  return (
    <Wrapper className="mb-10 w-full gap-4">
      <Button title={t('common.login')} size="xl" redirect="/auth/login" />
      <Button
        title={t('common.register')}
        variant="outlined"
        redirect="/auth/register/step-1"
        size="xl"
      />
    </Wrapper>
  );
}
