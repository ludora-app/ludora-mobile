import { Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { FooterWrapper } from '@/components/ui/footer-wrapper';

type OnBoardingSessionsInviteFooterProps = {
  invitedCount: number;
  isLoading: boolean;
  onPress: () => void;
};

/** The session is already published: "Inviter (n)" sends the invitations, "Terminer" goes home. */
export const OnBoardingSessionsInviteFooter = (props: OnBoardingSessionsInviteFooterProps) => {
  const { invitedCount, isLoading, onPress } = props;
  const { t } = useTranslate();

  return (
    <FooterWrapper hasBottomSafeArea>
      <Button
        title={
          invitedCount > 0 ? t('on-boarding.sessions.invite.invite_button', { count: invitedCount }) : t('common.finish')
        }
        colorVariant="secondary"
        size="xl"
        isLoading={isLoading}
        onPress={onPress}
      />
    </FooterWrapper>
  );
};
