import { ScrollView } from 'react-native';
import { BoxGrow, BoxRowGrow } from '@chillui/ui';
import { useLocalSearchParams } from 'expo-router';
import { ScreenLayout, Wrapper, BoxRow, String, Image, Box, Avatar } from '@ludo/ui';

import { useUserMe } from '@/queries/user-me.query';
import { getSportImage } from '@/utils/sports.utils';

import ProfilHeader from '../components/profil-header.component';
import RatingCard from '../components/rating-card/rating-card.component';
import { useGetUserDataById } from '../queries/get-user-data-by-id.query';
import ProfilSection4 from '../components/profil-section/profil-section-4.component';
import ProfilSection3 from '../components/profil-section/profil-section-3/profil-section-3.component';
import ProfilSection5 from '../components/profil-section/profil-section-5/profil-section-5.component';

export default function ProfilScreen() {
  const { id: userId } = useLocalSearchParams();
  const { data: userData } = useGetUserDataById(userId as string || undefined);

  const { userMe } = useUserMe(!userId);

  const isProfilMe = !userId;

  const { bio: userBio, firstname, friendsCount, imageUrl: avatarUrl, lastname, matchesCount, userSportPreferences } = isProfilMe ? userMe || {} : userData || {};


  return (
    <ScreenLayout>
      <ScrollView
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-5"
        nestedScrollEnabled
      >
        {/* Header */}
        <ProfilHeader />

        <Wrapper className='bg-background rounded-t-xl z-50 pt-2 gap-4'>
          {/* Section 1 */}
          <BoxRow className='items-center'>
            <BoxRowGrow className='gap-2'>
              <Avatar
                data={{
                  firstname,
                  imageUrl: avatarUrl,
                  lastname,
                }}
                className='rounded-2xl'
                size="xl"
              />
              <BoxGrow className='gap-1'>
                <String variant="body-3" font="primaryBold" truncate>{firstname} {lastname}</String>
                <BoxRow className="items-center gap-1">
                  {userSportPreferences?.map((sportPreference) => (
                    <Image
                      key={sportPreference.sport}
                      source={getSportImage(sportPreference.sport)}
                      className='size-6 rounded-lg'
                    />
                  ))}
                </BoxRow>
              </BoxGrow>
            </BoxRowGrow>
            <Box>
              <RatingCard size="sm" />
            </Box>
          </BoxRow>
          {/* Section 2 */}
          <String>{userBio}</String>
          {/* Section 3 */}
          <ProfilSection3 isMe={isProfilMe} />
          {/* Section 4 */}
          <ProfilSection4 friendsCount={friendsCount} matchesCount={matchesCount} />
          {/* Section 5 */}
          <ProfilSection5 />
        </Wrapper>
      </ScrollView>
    </ScreenLayout >
  );
}
