import { useMemo } from 'react';
import { cn } from '@chillui/ui';
import { Link } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { Pressable, StyleSheet } from 'react-native';
import { Avatar, Box, BoxGrow, BoxRow, Chip, IconButton, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import ROUTES from '@/constants/routes.constants';
import { FlattenedSessionPlayer } from '@/api/generated/model';

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
  const { bio, firstname, imageUrl, lastname, sportLevel, userUid } = sessionPlayer || {};

  const avatarColor = useMemo(() => (teamSide === 'left' ? 'border-primary' : 'border-secondary'), [teamSide]);
  const colorVariant = useMemo(() => (teamSide === 'left' ? 'primary' : 'secondary'), [teamSide]);

  const iconButtonColor = useMemo(() => (teamSide === 'left' ? COLORS.primary : COLORS.secondary), [teamSide]);

  return (
    <Link href={ROUTES.PROFIL.INDEX_UID(userUid)} asChild>
      <Pressable
        className={cn('mb-4 rounded-xl border p-2', {
          'border-primary/20': teamSide === 'left',
          'border-secondary/20': teamSide === 'right',
        })}
        style={teamSide === 'left' ? styles.leftShadow : styles.rightShadow}
      >
        <BoxRow className="items-center gap-2">
          <Avatar
            data={{ firstname, imageUrl, lastname }}
            className={avatarColor}
            contentProps={{ colorVariant }}
          />
          <BoxGrow className="gap-0.5">
            <String font="primarySemiBold" truncate>
              {firstname} {lastname}
            </String>
            {!!bio && (
              <String variant="body-xs" colorVariant="muted" truncate>
                {bio}
              </String>
            )}
            {!!sportLevel && (
              <Box className="mt-1 items-start">
                <Chip title={t(`common.user_level_${sportLevel}`)} size="2xs" />
              </Box>
            )}
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
      </Pressable>
    </Link>
  );
}
