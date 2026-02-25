import { useMemo } from 'react';
import { cn } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { Link, useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { Avatar, Box, BoxGrow, BoxRow, Chip, IconButton, String } from '@ludo/ui';

import { serialize } from '@/utils/json.utils';
import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { useUserMe } from '@/queries/user-me.query';
import { RootStackParamList } from '@/types/routes-params.types';
import { FindOneConversationResponseDataType, FlattenedSessionPlayer } from '@/api/generated/model';

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

type ChatRoomLocalSearchParams = RootStackParamList[typeof ROUTES.CHAT_ROOM.INDEX]


export default function SessionTeamsListItem(props: SessionTeamsListItemProps) {
  const router = useRouter()
  const { t } = useTranslate();
  const { userMeId } = useUserMe();
  const { data: sessionPlayer, teamSide } = props;
  const { bio, firstname, imageUrl, lastname, sportLevel, userUid } = sessionPlayer || {};

  const isMe = userMeId === userUid;

  const avatarColor = useMemo(() => (teamSide === 'left' ? 'border-primary' : 'border-secondary'), [teamSide]);
  const colorVariant = useMemo(() => (teamSide === 'left' ? 'primary' : 'secondary'), [teamSide]);

  const iconButtonColor = useMemo(() => (teamSide === 'left' ? COLORS.primary : COLORS.secondary), [teamSide]);

  const handlePressChatIcon = () => {
    const params: ChatRoomLocalSearchParams = {
      imageUrl: imageUrl || '',
      name: `${firstname} ${lastname}`,
      receiver: serialize({
        firstname,
        lastname,
        userUid,
      }),
      type: FindOneConversationResponseDataType.PRIVATE,
      userUid,
    }
    router.navigate({ params, pathname: ROUTES.CHAT_ROOM.INDEX_UID(undefined) })
  };

  return (
    <Link href={ROUTES.PROFIL.INDEX_UID(userUid)} asChild disabled={isMe}>
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
            <BoxRow className='items-center gap-2'>
              <String font="primarySemiBold" truncate>
                {firstname} {lastname}
              </String>
              {isMe && (
                <Chip
                  title={t('common.me')}
                  size="2xs"
                  colorVariant={colorVariant}
                  variant="outlined"
                />
              )}
            </BoxRow>
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
          {!isMe &&
            <IconButton
              iconName="chatbot-regular"
              variant="outlined"
              colorVariant={colorVariant}
              iconColor={iconButtonColor}
              rounded="circle"
              size="xs"
              onPress={handlePressChatIcon}
            />}
        </BoxRow>
      </Pressable>
    </Link>
  );
}
