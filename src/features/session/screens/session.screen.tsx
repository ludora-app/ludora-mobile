import COLORS from '@/constants/COLORS';
import { Platform } from 'react-native';
import { SportsEnum } from '@/constants/SPORTS';
import { useLocalSearchParams } from 'expo-router';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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
  const params = useLocalSearchParams();
  const sessionDetails = sessionUtils.getSessionDetails(params.id as string);

  return (
    <Wrapper>
      <Box className="flex justify-around rounded-lg border">
        <Box className="flex flex-row gap-2">
          <Badge title={sessionDetails.sport} size="sm" />
          <Badge title={sessionDetails.gameMode} size="sm" />
        </Box>
        <Box className="flex items-center gap-2 p-2">
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
          <Box className="flex flex-row gap-1 text-gray-400" />
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
        <Box className="flex flex-row">
          <Box className="flex-1">
            <String variant="dark" size="lg">
              <String weight="bold">{sessionDetails.fieldPrice}€ / heure</String>
            </String>
            <String variant="tertiary">
              Durée estimée: {getEstimatedTime(sessionDetails.startDate, sessionDetails.endDate)}
            </String>
          </Box>
          <Box className="flex-1">
            <Button>
              <String variant="white" size="lg">
                Réserver
              </String>
            </Button>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
}
