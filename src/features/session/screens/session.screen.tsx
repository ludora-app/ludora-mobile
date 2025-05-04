import COLORS from '@/constants/COLORS';
import { ImageBackground } from 'expo-image';
import { welcomeScreenImageBackground } from 'assets';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { sportsColors, SportsEnum } from '@/constants/SPORTS';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';
import { formatHour, getDayOfWeek, getEstimatedTime } from '@/utils/date.utils';
import { Badge, Box, Button, Icon, Separator, String, Wrapper } from '@/components/chillUI';

import sessionUtils from '../utils/session.utils';
import TeamContainer from '../components/team-container.component';

export interface SessionScreenProps {
  id: string;
  endDate: string;
  fieldName: string;
  sport: SportsEnum;
  startDate: string;
  fieldPrice: number;
  participants: number;
  maxParticipants: number;
}

export default function SessionScreen() {
  const router = useRouter();

  const params = useLocalSearchParams();
  const sessionDetails = sessionUtils.getSessionDetails((params.id as string) ?? '1');
  const { top } = useSafeAreaInsets();
  return (
    <Box className="flex-1">
      <ScrollView
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Box className="h-72">
          <ImageBackground source={welcomeScreenImageBackground} className="flex h-72">
            <Box className="flex h-full justify-between pb-4">
              <Box style={{ paddingTop: top }} className="flex w-full flex-row items-end justify-between px-4">
                <TouchableOpacity
                  className="flex-row items-center gap-1 rounded-full bg-white p-2"
                  onPress={() => router.back()}
                >
                  <Icon variant="arrow-left-solid" size="md" />
                </TouchableOpacity>
                <Box className="flex flex-row gap-2">
                  <TouchableOpacity className="flex-row items-center gap-1 rounded-full bg-white p-2">
                    <Icon variant="heart-solid" size="md" />
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center gap-1 rounded-full bg-white p-2">
                    <Icon variant="share-nodes-regular" size="md" />
                  </TouchableOpacity>
                </Box>
              </Box>
              <Box className="ml-3 flex flex-row gap-2">
                <Badge title={sessionDetails.sport} variant={sportsColors.get(sessionDetails.sport as SportsEnum)} />
                <Badge title={sessionDetails.gameMode} variant="black" />
              </Box>
            </Box>
          </ImageBackground>
        </Box>
        <Wrapper className="relative z-50 -m-2 rounded-t-3xl bg-white">
          <Box className="flex justify-around">
            <Box className="flex items-center gap-2 px-5 pt-5">
              <Box className="flex flex-row items-center">
                <String weight="bold" size="2xl" position="center">
                  {sessionDetails.fieldName}
                </String>
              </Box>
              <Box className="flex flex-row items-center gap-1">
                <Icon variant="calendar-clock-regular" color="#9ca3af" />
                <String variant="tertiary">
                  {getDayOfWeek(sessionDetails.startDate)} : {formatHour(sessionDetails.startDate)} -{' '}
                  {formatHour(sessionDetails.endDate)}
                </String>
              </Box>
              <Box className="flex flex-row items-center gap-1">
                <Icon variant="user-regular" color="#9ca3af" size="sm" />
                <String variant="tertiary" size="sm">
                  {sessionDetails.participants} / {sessionDetails.maxParticipants}
                </String>
              </Box>
              <Box className="text-gray-400 flex flex-row gap-1" />
            </Box>
            <Box className="m-3 gap-2 rounded-lg">
              <Separator />
              <Box className="flex">
                <String weight="bold" size="lg">
                  Position
                </String>
                <String variant="tertiary">{sessionDetails?.fieldLocation.address}</String>
              </Box>
              <MapView
                focusable={false}
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                region={{
                  latitude: sessionDetails?.fieldLocation.latitude,
                  latitudeDelta: 0.01,
                  longitude: sessionDetails?.fieldLocation.longitude,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                loadingEnabled
                loadingBackgroundColor="#fff"
                loadingIndicatorColor={COLORS.primary}
                style={{ borderRadius: 10, height: 300, width: '100%' }}
              >
                <Marker
                  coordinate={{
                    latitude: sessionDetails?.fieldLocation.latitude,
                    longitude: sessionDetails?.fieldLocation.longitude,
                  }}
                />
              </MapView>
            </Box>
            <TeamContainer teams={sessionDetails.teams} />
          </Box>
        </Wrapper>
      </ScrollView>
      <Box className="border-gray-200 absolute bottom-0 left-0 right-0 flex flex-row border-t bg-white px-8 pb-8 pt-5">
        <Box className="flex-1">
          <String variant="dark" size="lg">
            <String weight="bold">{sessionDetails.fieldPrice}€ / heure</String>
          </String>
          <String variant="tertiary">
            Durée estimée: {getEstimatedTime(sessionDetails.startDate, sessionDetails.endDate)}
          </String>
        </Box>
        <Button title="Réserver" />
      </Box>
    </Box>
  );
}
