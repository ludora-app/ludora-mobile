import { useMemo } from 'react';
import { useRouter } from 'expo-router';
import { useTranslate } from '@tolgee/react';
import { TouchableOpacity } from 'react-native';
import { BoxGrow, BoxRowGrow, IconButton, String } from '@ludo/ui';

import { serialize } from '@/utils/json.utils';
import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { useUserMe } from '@/queries/user-me.query';
import { RootStackParamList } from '@/types/routes-params.types';
import { useSessionTeamStore } from '@/features/session/stores/session-team.store';
import { FindOneConversationResponseDataType, FindOneSessionResponseData } from '@/api/generated/model';
import SessionTeamsCardAvatar from '@/components/ui/session-teams-card/session-teams-card-avatar.component';

import SessionSectionWrapperItem from '../section-section-wrapper/session-section-wrapper-item.component';

type SessionSectionCreatorCardProps = {
  creator: FindOneSessionResponseData['creator'];
};

type LocalSearchParamsChatRoom = RootStackParamList[typeof ROUTES.CHAT_ROOM.INDEX];
export default function SessionSectionCreatorCard(props: SessionSectionCreatorCardProps) {
  const router = useRouter();
  const { t } = useTranslate();
  const { userMeId } = useUserMe();

  const { creator } = props;
  const { firstname, imageUrl, lastname, sessionsCount, userUid: creatorUserUid } = creator || {};
  const isCreatorMe = userMeId === creatorUserUid;
  const sideTeam = useSessionTeamStore(state => state.sideTeam);

  const handleIconColor = useMemo(() => {
    if (!sideTeam) {
      return COLORS.muted;
    }
    return sideTeam === 'left' ? COLORS.primary : COLORS.secondary;
  }, [sideTeam]);

  const handleColorVariant = useMemo(() => {
    if (!sideTeam) {
      return 'muted';
    }
    return sideTeam === 'left' ? 'primary' : 'secondary';
  }, [sideTeam]);

  const handleIconPress = () => {
    const params: LocalSearchParamsChatRoom = {
      imageUrl: imageUrl || '',
      name: `${firstname} ${lastname}`,
      receiver: serialize({
        firstname,
        lastname,
        userUid: creatorUserUid,
      }),
      type: FindOneConversationResponseDataType.PRIVATE,
      userUid: creatorUserUid
    };
    router.navigate({ params, pathname: ROUTES.CHAT_ROOM.INDEX_UID(undefined) });
  };

  const handleCardPress = () => {
    router.navigate(ROUTES.PROFIL.INDEX_UID(creatorUserUid));
  };

  return (
    <TouchableOpacity onPress={handleCardPress} disabled={isCreatorMe}>
      <SessionSectionWrapperItem className="flex-row items-center justify-between">
        <BoxRowGrow className="items-center gap-2">
          <SessionTeamsCardAvatar data={creator} sideTeam={sideTeam} />
          <BoxGrow>
            <String font="primaryBold" truncate>
              {firstname}
            </String>
            <String variant="body-sm">{t('session.creator-section.sessions_count', { count: sessionsCount })}</String>
          </BoxGrow>
        </BoxRowGrow>
        {!isCreatorMe && <IconButton
          iconName="chatbot-regular"
          variant="outlined"
          iconColor={handleIconColor}
          colorVariant={handleColorVariant}
          rounded="circle"
          onPress={handleIconPress}
        />}
      </SessionSectionWrapperItem>
    </TouchableOpacity>
  );
}
