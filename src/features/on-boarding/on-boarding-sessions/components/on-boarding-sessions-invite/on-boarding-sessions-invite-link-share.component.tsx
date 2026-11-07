import { useTranslate } from '@tolgee/react';
import { Linking, Share } from 'react-native';
import { Box, BoxRow, IconButton, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { TIconsAll } from '@/constants/icons.constants';
import { IS_IOS } from '@/constants/platform.constants';

export type InviteLinkShareChannel = 'mail' | 'messages' | 'more' | 'whatsapp';

const SHARE_CHANNELS: { channel: InviteLinkShareChannel; iconName: TIconsAll }[] = [
  { channel: 'whatsapp', iconName: 'whatsapp-regular' },
  { channel: 'messages', iconName: 'message-text-regular' },
  { channel: 'mail', iconName: 'email-regular' },
  { channel: 'more', iconName: 'export-regular' },
];

type OnBoardingSessionsInviteLinkShareProps = {
  message: string;
  onShare?: (channel: InviteLinkShareChannel) => void;
  subject: string;
};

function getChannelUrl({ channel, message, subject }: { channel: InviteLinkShareChannel; message: string; subject: string }) {
  const body = encodeURIComponent(message);
  if (channel === 'whatsapp') return `whatsapp://send?text=${body}`;
  if (channel === 'messages') return `sms:${IS_IOS ? '&' : '?'}body=${body}`;
  if (channel === 'mail') return `mailto:?subject=${encodeURIComponent(subject)}&body=${body}`;
  return null;
}

/** Quick share shortcuts under the invite link: an app opens with the message, "Plus" opens the share sheet. */
export const OnBoardingSessionsInviteLinkShare = (props: OnBoardingSessionsInviteLinkShareProps) => {
  const { message, onShare, subject } = props;
  const { t } = useTranslate();

  const handleShare = async (channel: InviteLinkShareChannel) => {
    onShare?.(channel);
    const url = getChannelUrl({ channel, message, subject });
    try {
      if (url) {
        await Linking.openURL(url);
        return;
      }
    } catch {
      // The app is not installed: the share sheet takes over
    }
    await Share.share({ message });
  };

  return (
    <BoxRow className="justify-between gap-2 border-t-[1.5px] border-border pt-3">
      {SHARE_CHANNELS.map(({ channel, iconName }) => (
        <Box key={channel} className="flex-1 items-center gap-1.5">
          <IconButton
            as="scale-pressable"
            iconName={iconName}
            iconColor={COLORS.primary}
            size="md"
            rounded="circle"
            className="size-13 bg-primarySoft"
            onPress={() => handleShare(channel)}
          />
          <String variant="body-xs" font="primaryBold">
            {t(`on-boarding.sessions.invite.share_${channel}`)}
          </String>
        </Box>
      ))}
    </BoxRow>
  );
};
