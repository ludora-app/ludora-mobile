import { cn } from '@chillui/ui';
import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Avatar, Box, BoxGrow, BoxRow, IconButton, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { FlattenedSessionPlayer } from '@/api/generated/model';
import { useMemo } from 'react';

type SessionTeamsListItemProps = {
  data: FlattenedSessionPlayer;
  teamSide: 'left' | 'right';
};

const styles = StyleSheet.create({
  leftShadow: {
    boxShadow: '0px 0px 5px #F1450040',
  },
  rightShadow: {
    boxShadow: '0px 0px 5px #864C9E40',
  },
});

export default function SessionTeamsListItem(props: SessionTeamsListItemProps) {
  const { t } = useTranslate();
  const { data: sessionPlayer, teamSide } = props;
  const { bio, firstname, lastname, sessionsCount } = sessionPlayer || {};

  const avatarColor = useMemo(() => (teamSide === 'left' ? 'border-primary' : 'border-secondary'), [teamSide]);
  const colorVariant = useMemo(() => (teamSide === 'left' ? 'primary' : 'secondary'), [teamSide]);

  const iconButtonColor = useMemo(() => (teamSide === 'left' ? COLORS.primary : COLORS.secondary), [teamSide]);

  return (
    <Box
      className={cn('mb-4 rounded-xl border p-2', {
        'border-primary/20': teamSide === 'left',
        'border-secondary/20': teamSide === 'right',
      })}
      style={teamSide === 'left' ? styles.leftShadow : styles.rightShadow}
    >
      <BoxRow className="items-center gap-2">
        <Avatar data={sessionPlayer} className={avatarColor} contentProps={{ colorVariant: colorVariant }} />
        <BoxGrow className="gap-0.5">
          <String font="primarySemiBold" truncate>
            {firstname} {lastname}
          </String>
          {!!bio && (
            <String variant="body-xs" colorVariant="muted" truncate>
              {bio}
            </String>
          )}
          <String variant="body-xs" className="text-ring">
            {t('session.teams_list_user_sessions_count', { count: sessionsCount })}
          </String>
        </BoxGrow>
        <IconButton
          iconName="chatbot-regular"
          variant="outlined"
          colorVariant={colorVariant}
          iconColor={iconButtonColor}
          rounded="circle"
          size="xs"
        />
      </BoxRow>
    </Box>
  );
}
