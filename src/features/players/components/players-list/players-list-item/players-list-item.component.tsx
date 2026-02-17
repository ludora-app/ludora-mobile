import { memo, useMemo } from 'react';
import { useTranslate } from '@tolgee/react';
import { Pressable, StyleSheet } from 'react-native';
import { Avatar, Box, BoxGrow, BoxRow, Icon, Image, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { getSportImage } from '@/utils/sports.utils';
import { SessionCollectionItemDtoSport } from '@/api/generated/model';

import type { PlayerMock, PlayerSportPreference } from '../../mocks/players.mocks';

import PlayersListItemBanner from './players-list-item-banner.component';
import PlayersListItemInvite from './players-list-item-invite.component';

type Props = {
  item: PlayerMock;
};

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
  },
});

const LEVEL_COLORS: Record<number, string> = {
  1: '#4CAF50',
  2: '#FF9800',
  3: COLORS.primary,
};



function PlayersListItem({ item }: Props) {
  const {
    commonSports,
    isSameCity,
    userAvatar,
    userBio,
    userCity,
    userFirstName,
    userLastName,
    userSportPreferences,
  } = item || {};
  const { t } = useTranslate();

  const fullName = `${userFirstName} ${userLastName}`;
  const hasSports = userSportPreferences && userSportPreferences.length > 0;

  const sportItems = useMemo(
    () =>
      (userSportPreferences ?? []).map((pref: PlayerSportPreference) => ({
        image: getSportImage(pref.sport as SessionCollectionItemDtoSport),
        level: pref.level,
        sport: pref.sport,
      })),
    [userSportPreferences],
  );

  return (
    <Pressable style={styles.shadow} className="rounded-xl mb-3">
      <Box className="overflow-hidden rounded-xl border border-black/10 bg-white">

        {/* Ludo common points */}
        <PlayersListItemBanner commonSports={commonSports} isSameCity={isSameCity} />

        {/* Top section: Avatar + Name */}
        <Box className='p-3 gap-3'>
          <Box >
            <BoxRow className="items-center gap-3 pb-0">
              <Avatar
                data={{ firstname: userFirstName, imageUrl: userAvatar ?? '', lastname: userLastName }}
                size="lg"
              />

              <BoxGrow className="gap-0.5">
                <String font="primaryExtraBold" variant="body-sm">
                  {fullName}
                </String>
                {userCity ? (
                  <BoxRow className="items-center gap-1">
                    <Icon name="location-solid" color={COLORS.primary} size="xs" />
                    <String variant="body-xs" colorVariant="muted">
                      {userCity}
                    </String>
                  </BoxRow>
                ) : null}
              </BoxGrow>
            </BoxRow>

            {/* Bio */}
            {userBio ? (
              <Box className="px-3 pt-2">
                <String variant="body-sm" colorVariant="muted" numberOfLines={2} ellipsizeMode="tail">
                  {userBio}
                </String>
              </Box>
            ) : null}

            {/* Sports with individual levels */}
            {hasSports ? (
              <BoxRow className="flex-wrap gap-2 px-3 pt-2">
                {sportItems.map(({ image, level, sport }) => (
                  <BoxRow key={sport} className="items-center gap-1.5 rounded-full bg-[#F5F5F5] py-1 pl-1.5 pr-2.5">
                    <Image source={image} className="size-5" />
                    {level != null ? (
                      <String
                        variant="body-xs"
                        font="primaryBold"
                        style={{ color: LEVEL_COLORS[level] ?? COLORS.primary }}
                      >
                        {t(`common.user_level_${level}`)}
                      </String>
                    ) : null}
                  </BoxRow>
                ))}
              </BoxRow>
            ) : null}

            {/* Bottom section: Invite button */}

          </Box>
          <PlayersListItemInvite />
        </Box>
      </Box>
    </Pressable>
  );
}

export default memo(PlayersListItem, (prevProps, nextProps) => prevProps.item.uid === nextProps.item.uid);