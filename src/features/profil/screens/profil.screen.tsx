import { useMemo } from 'react';
import { ScreenLayout, Wrapper } from '@ludo/ui';
import { Redirect, useLocalSearchParams } from 'expo-router';

import ROUTES from '@/constants/routes.constants';
import { useUserMe } from '@/queries/user-me.query';

import { useGetUserDataById } from '../queries/get-user-data-by-id.query';
import ProfilHeader from '../components/profil-header/profil-header.component';
import ProfilSesion2 from '../components/profil-section/profil-section-2/profil-section-2.component';
import ProfilSection4 from '../components/profil-section/profil-section-4/profil-section-4.component';
import ProfilSection3 from '../components/profil-section/profil-section-3/profil-section-3.component';
import ProfilSection5 from '../components/profil-section/profil-section-5/profil-section-5.component';
import ProfilSection1 from '../components/profil-section/profil-section-1/profil-section-1.component';
import ProfilSesion2Skeleton from '../components/profil-section/profil-section-2/profil-section-skeleton.component';
import ProfilSection4Skeleton from '../components/profil-section/profil-section-4/profil-section-4-skeleton.component';
import ProfilSection1Skeleton from '../components/profil-section/profil-section-1/profil-section-1-skeleton.component';

export default function ProfilScreen() {
  const { id: userId } = useLocalSearchParams();
  const { userMeId } = useUserMe();
  const {
    data: userData,
    isLoading: isLoadingUserData,
    isRefetching: isRefetchingUser,
    refetch: refetchUser
  } = useGetUserDataById(userId as string || undefined);

  const {
    isLoading: isLoadingUserMe,
    isRefetching: isRefetchingUserMe,
    refetch: refetchUserMe,
    userMe
  } = useUserMe(!userId);

  const isProfilMe = useMemo(() => {
    if (!userId) return true;
    if (userMeId === userId) return true;
    return false;
  }, [userId, userMeId]);

  const {
    bio: userBio,
    firstname,
    friendsCount,
    imageUrl: avatarUrl,
    lastname,
    matchesCount,
    sportPreferences
  } = isProfilMe ? userMe || {} : userData || {};

  const hasData = isProfilMe ? !!userMe : !!userData;

  const isProfilLoading = isLoadingUserData || isLoadingUserMe;
  const isRefetching = isProfilMe ? isRefetchingUserMe : isRefetchingUser;
  const isFetching = isProfilMe ? (isLoadingUserMe || isRefetchingUserMe) : (isLoadingUserData || isRefetchingUser);

  if (!hasData && !isFetching) {
    return <Redirect href={ROUTES.NOT_FOUND.INDEX} />
  }

  const handleRefetch = async () => {
    if (isProfilMe) {
      await refetchUserMe();
    } else {
      await refetchUser();
    }
  };


  const profilHeader = (
    <>
      <ProfilHeader isMe={isProfilMe} firstname={firstname} lastname={lastname} />
      <Wrapper className='bg-background rounded-t-xl z-50 pt-4 gap-4'>
        {isProfilLoading ? <ProfilSection1Skeleton /> : (
          <ProfilSection1
            firstname={firstname}
            lastname={lastname}
            avatarUrl={avatarUrl}
            sportPreferences={sportPreferences}
            isMe={isProfilMe}
          />
        )}
        {isProfilLoading ? <ProfilSesion2Skeleton /> : (
          <ProfilSesion2 bio={userBio} isMe={isProfilMe} />
        )}
        <ProfilSection3 isMe={isProfilMe} />
        {isProfilLoading ? <ProfilSection4Skeleton /> : (
          <ProfilSection4 friendsCount={friendsCount} matchesCount={matchesCount} isMe={isProfilMe} />
        )}
      </Wrapper>
    </>
  );




  return (
    <ScreenLayout>
      <ProfilSection5
        header={profilHeader}
        isRefetching={isRefetching}
        onRefresh={handleRefetch}
      />
    </ScreenLayout>
  );
}
