import { useLocalSearchParams } from 'expo-router';
import { ScreenLayout, Wrapper, ScrollView } from '@ludo/ui';

import { useUserMe } from '@/queries/user-me.query';

import { useGetUserDataById } from '../queries/get-user-data-by-id.query';
import ProfilHeader from '../components/profil-header/profil-header.component';
import ProfilSesion2 from '../components/profil-section/profil-sesion-2.component';
import ProfilSection1 from '../components/profil-section/profil-section-1.component';
import ProfilSection4 from '../components/profil-section/profil-section-4.component';
import ProfilSection3 from '../components/profil-section/profil-section-3/profil-section-3.component';
import ProfilSection5 from '../components/profil-section/profil-section-5/profil-section-5.component';

export default function ProfilScreen() {
  const { id: userId } = useLocalSearchParams();
  const { data: userData, isRefetching: isRefetchingUser, refetch: refetchUser } = useGetUserDataById(userId as string || undefined);

  const { isRefetching: isRefetchingUserMe, refetch: refetchUserMe, userMe } = useUserMe(!userId);

  const isProfilMe = !userId;

  const { bio: userBio, firstname, friendsCount, imageUrl: avatarUrl, lastname, matchesCount, sportPreferences } = isProfilMe ? userMe || {} : userData || {};

  const handleRefetch = async () => {
    if (isProfilMe) {
      await refetchUserMe()
    } else {
      await refetchUser()
    }
  }

  const isRefetching = isProfilMe ? isRefetchingUserMe : isRefetchingUser


  return (
    <ScreenLayout>
      <ScrollView hasRefreshControl isRefetching={isRefetching} refetch={handleRefetch}>
        {/* Header */}
        <ProfilHeader isMe={isProfilMe} />

        <Wrapper fill className='bg-background rounded-t-xl z-50 pt-2 gap-4'>
          {/* Section 1 */}
          <ProfilSection1
            firstname={firstname}
            lastname={lastname}
            avatarUrl={avatarUrl}
            sportPreferences={sportPreferences}
            isMe={isProfilMe}
          />
          {/* Section 2 */}
          <ProfilSesion2 bio={userBio} isMe={isProfilMe} />
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
