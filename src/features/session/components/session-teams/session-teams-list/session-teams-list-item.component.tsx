import { StyleSheet } from 'react-native';
import { useTranslate } from '@tolgee/react';
import { Avatar, Box, BoxGrow, BoxRow, IconButton, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { FlattenedSessionPlayer } from '@/api/generated/model';

type SessionTeamsListItemProps = {
  data: FlattenedSessionPlayer;
};

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 0px 5px #F1450040',
  },
});

export default function SessionTeamsListItem(props: SessionTeamsListItemProps) {
  const { t } = useTranslate();
  const { data: sessionPlayer } = props;
  const { bio, firstname, lastname, sessionsCount } = sessionPlayer || {};

  return (
    <Box className="border-primary/20 mb-4 rounded-xl border p-2" style={styles.shadow}>
      <BoxRow className="items-center gap-2">
        <Avatar data={sessionPlayer} />
        <BoxGrow className="gap-0.5">
          <String font="primarySemiBold">
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
          iconColor={COLORS.primary}
          rounded="circle"
          size="xs"
        />
      </BoxRow>
    </Box>
  );
}
