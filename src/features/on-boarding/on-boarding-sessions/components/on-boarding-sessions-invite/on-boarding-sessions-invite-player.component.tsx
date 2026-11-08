import { memo } from 'react';
import { cn } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { Avatar, Box, Button, Card, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { CompatibleUserCollectionItemDto } from '@/api/generated/model';

import { useOnBoardingSessionsStore } from '../../../stores/on-boarding-sessions.store';

type OnBoardingSessionsInvitePlayerProps = {
  item: CompatibleUserCollectionItemDto;
};

function OnBoardingSessionsInvitePlayer({ item }: OnBoardingSessionsInvitePlayerProps) {
  const { t } = useTranslate();
  const { distance, firstname, imageUrl, lastname, level, uid } = item;
  const isInvited = useOnBoardingSessionsStore(state => state.invitedUserUids.includes(uid));
  const toggleInvitedUserUid = useOnBoardingSessionsStore(state => state.toggleInvitedUserUid);

  const meta = [
    t(`common.session_level_${level}`),
    distance != null && `${distance.toLocaleString('fr-FR')} ${t('common.km')}`,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <Card className="mb-2.5 flex-row items-center gap-3 px-3.5 py-3">
      <Avatar
        size="sm"
        className="border-0"
        hasRandomColor
        contentProps={{ font: 'secondaryExtraBold', size: 'sm' }}
        data={{
          firstname: firstname ?? '',
          id: uid,
          imageUrl: imageUrl ? { uri: imageUrl } : undefined, lastname: lastname ?? undefined }}
      />
      <Box className="flex-1">
        <String font="primaryExtraBold" truncate>
          {[firstname, lastname && `${lastname.charAt(0)}.`].filter(Boolean).join(' ')}
        </String>
        <String variant="body-sm" font="primarySemiBold" colorVariant="muted" truncate>
          {meta}
        </String>
      </Box>
      <Button
        title={t(isInvited ? 'on-boarding.sessions.invite.invited' : 'on-boarding.sessions.invite.invite')}
        variant="outlined"
        colorVariant="dark"
        size="sm"
        className={cn('h-10', { 'border-primary/50 bg-primarySoft': isInvited })}
        fit
        onPress={() => toggleInvitedUserUid(uid)}
        iconProps={{
          className: 'mr-1',
          color: COLORS.dark,
          name: isInvited ? 'check-solid' : 'send-2-solid',
          position: 'left',
        }}
      />
    </Card>
  );
}

export default memo(OnBoardingSessionsInvitePlayer);
