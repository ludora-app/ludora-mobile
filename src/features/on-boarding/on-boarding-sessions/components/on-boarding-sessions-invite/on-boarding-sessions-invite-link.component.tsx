import { cn } from '@chillui/ui';
import { useEffect, useState } from 'react';
import { useTranslate } from '@tolgee/react';
import { Box, BoxCenter, BoxRow, Button, Card, CardDescription, CardTitle, Icon } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';

import {
  InviteLinkShareChannel,
  OnBoardingSessionsInviteLinkShare,
} from './on-boarding-sessions-invite-link-share.component';

const COPIED_FEEDBACK_MS = 2_000;

type OnBoardingSessionsInviteLinkProps = {
  onCopy: () => Promise<void>;
  onShare?: (channel: InviteLinkShareChannel) => void;
  shareMessage: string;
  shareSubject: string;
  url: string;
};

export const OnBoardingSessionsInviteLink = (props: OnBoardingSessionsInviteLinkProps) => {
  const { onCopy, onShare, shareMessage, shareSubject, url } = props;
  const { t } = useTranslate();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return undefined;
    const timeout = setTimeout(() => setIsCopied(false), COPIED_FEEDBACK_MS);
    return () => clearTimeout(timeout);
  }, [isCopied]);

  const handleCopy = async () => {
    await onCopy();
    setIsCopied(true);
  };

  return (
    <Card className="px-4 py-3.5">
      <BoxRow className="items-center gap-3">
        <BoxCenter className="size-11 rounded-full bg-primarySoft">
          <Icon name="link-regular" color={COLORS.primary} size="md" />
        </BoxCenter>
        <Box className="flex-1">
          <CardTitle variant="body-1" font="primaryExtraBold">
            {t('on-boarding.sessions.invite.link_title')}
          </CardTitle>
          <CardDescription numberOfLines={1}>{url.replace(/^https?:\/\/(www\.)?/, '')}</CardDescription>
        </Box>
        <Button
          title={t(isCopied ? 'common.copied' : 'common.copy')}
          variant="outlined"
          colorVariant="dark"
          size="sm"
          className={cn('h-10', { 'border-primary/50 bg-primarySoft': isCopied })}
          iconProps={
            isCopied ? { className: 'mr-1', color: COLORS.dark, name: 'check-solid', position: 'left' } : undefined
          }
          onPress={handleCopy}
          fit
        />
      </BoxRow>
      <OnBoardingSessionsInviteLinkShare message={shareMessage} subject={shareSubject} onShare={onShare} />
    </Card>
  );
};
