import { Button, Wrapper } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

export default function WelcomeFooter() {
  const { t } = useTranslate();

  return (
    <Wrapper className="mb-10 w-full gap-4">
      <Button title={t('welcome.footer_button_start_game')} size="xl" redirect="/auth/login" />
      <Button
        title={t('welcome.footer_button_join_game')}
        variant="outlined"
        redirect="/auth/register/step-1"
        size="xl"
      />
    </Wrapper>
  );
}
