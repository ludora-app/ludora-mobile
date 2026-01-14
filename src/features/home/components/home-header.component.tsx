import { Button } from '@ludo/ui';
import { useEffect, useState } from 'react';
import { useTranslate } from '@tolgee/react';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';
import { Alert, Button as RNButton, Platform, StyleSheet, Text, View } from 'react-native';
import { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import COLORS from '@/constants/COLORS';
import { useUserMe } from '@/queries/user-me.query';
import { truncateString } from '@/utils/string.utils';
import { SessionCard } from '@/components/ui/session-card';
import { ReanimatedBox } from '@/components/chill-ui-library';
import { SessionCollectionItem } from '@/api/generated/model';
import Header from '@/components/ui/header/components/header.component';

// Configure how notifications are handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const styles = StyleSheet.create({
  orangeHeader: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 0,
  },
});

interface HomeHeaderProps {
  scrollY: SharedValue<number>;
}
const mockSession: SessionCollectionItem = {
  creatorUid: 'cmj5pw27v002275ls35a4rnad',
  endDate: '2026-01-22T12:00:00.000Z',
  fieldLatitude: 48.75098440000001,
  fieldLongitude: 2.3718412,
  fieldShortAddress: 'ZI SENIA, 2 rue du Courson, Thiais 94320, France',
  gameMode: 'SIX_V_SIX',
  level: 2,
  maxPlayersPerTeam: 5,
  minPlayersPerTeam: 3,
  sessionTeams: [
    {
      numberOfPlayers: 0,
      teamName: 'Team B',
    },
    {
      numberOfPlayers: 0,
      teamName: 'Team A',
    },
  ],
  sport: 'FOOTBALL',
  startDate: '2026-01-22T10:00:00.000Z',
  teamsPerGame: 2,
  uid: 'cmj5pw29n003u75lsml3fafds',
  userDistance: null,
};

async function getFCMToken() {
  try {
    // Request permission (iOS only, Android auto-granted)
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      Alert.alert('Permission Requise', 'Permissions de notification refusées!');
      return null;
    }

    // Setup notification channel for Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        importance: Notifications.AndroidImportance.MAX,
        lightColor: '#FF231F7C',
        name: 'default',
        vibrationPattern: [0, 250, 250, 250],
      });
    }

    // Get FCM token
    const token = await messaging().getToken();
    console.log('✅ FCM Device Token:', token);

    // Listen for token refresh
    messaging().onTokenRefresh(newToken => {
      console.log('🔄 FCM Token refreshed:', newToken);
    });

    return token;
  } catch (error) {
    console.error('❌ Error getting FCM token:', error);
    Alert.alert('Erreur', `Impossible d'obtenir le FCM token: ${error}`);
    return null;
  }
}

export function HomeHeader({ scrollY }: HomeHeaderProps) {
  const { t } = useTranslate();
  const { userMe } = useUserMe();
  const hasNewSession = false;

  const [fcmToken, setFcmToken] = useState<string>('');
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const [showNotificationTest, setShowNotificationTest] = useState(false);

  useEffect(() => {
    // Request permissions and get FCM token
    getFCMToken().then(token => {
      if (token) {
        setFcmToken(token);
        console.log('🔥 FCM Token:', token);
      }
    });

    // Listen for foreground messages
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('📩 FCM Notification received (foreground):', remoteMessage);
      Alert.alert(remoteMessage.notification?.title || 'Notification', remoteMessage.notification?.body || '');
    });

    // Listen for notification taps (when user opens app from notification)
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('👆 Notification opened app:', remoteMessage);
      Alert.alert('Notification Tapped!', JSON.stringify(remoteMessage, null, 2));
    });

    // Check if app was opened by a notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('🚀 App opened by notification:', remoteMessage);
        }
      });

    // Listen for local notifications (for test button)
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('📩 Local notification received:', notification);
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('👆 Local notification tapped:', response);
    });

    return () => {
      unsubscribeForeground();
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolation.CLAMP),
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 200], [0, -50], Extrapolation.CLAMP),
      },
    ],
    zIndex: scrollY.value < 10 ? 10 : 0,
  }));

  return (
    <ReanimatedBox style={[styles.orangeHeader, headerAnimatedStyle]}>
      <Header
        title={t('home.header.title', { username: truncateString({ maxLength: 8, str: userMe?.firstname ?? '' }) })}
        subTitle={t(hasNewSession ? 'home.header.sub_title_incoming_session' : 'home.header.sub_title')}
        hasNewSession={hasNewSession}
      >
        {hasNewSession && <SessionCard session={mockSession} isNextSession />}
        {!hasNewSession && (
          <Button
            title={t('home.header.button_create_match')}
            colorVariant="inverted"
            as="scale-pressable"
            redirect="/create-session"
            size="md"
            iconProps={{
              color: COLORS.primary,
              name: 'flash-solid',
              size: 'lg',
            }}
            fit
            contentProps={{
              className: 'gap-1',
            }}
          />
        )}

        {/* Notification Test Section */}
        <View style={{ marginTop: 20 }}>
          <RNButton
            title={showNotificationTest ? '❌ Masquer tests de notification' : '🔔 Tests de notification'}
            onPress={() => setShowNotificationTest(!showNotificationTest)}
          />
        </View>

        {showNotificationTest && (
          <View style={{ backgroundColor: 'white', borderRadius: 12, marginTop: 16, padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>🔔 Push Notification Test</Text>

            {fcmToken && (
              <View style={{ backgroundColor: '#f0f0f0', borderRadius: 8, marginBottom: 16, padding: 10 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>🔥 FCM Device Token:</Text>
                <Text style={{ fontFamily: 'monospace', fontSize: 9 }} selectable>
                  {fcmToken}
                </Text>
              </View>
            )}

            <RNButton
              title="📱 Test Notification (Local)"
              onPress={async () => {
                await Notifications.scheduleNotificationAsync({
                  content: {
                    body: 'Ceci est une notification de test locale!',
                    data: { testData: 'test data' },
                    title: 'Test Notification 🎉',
                  },
                  trigger: {
                    seconds: 2,
                    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                  },
                });
                Alert.alert('Planifié!', 'La notification apparaîtra dans 2 secondes');
              }}
            />

            <View style={{ marginTop: 12 }}>
              <RNButton
                title="📤 Copier le FCM Token"
                onPress={() => {
                  if (fcmToken) {
                    Alert.alert('FCM Token', fcmToken);
                  }
                }}
              />
            </View>

            {notification && (
              <View style={{ backgroundColor: '#e3f2fd', borderRadius: 8, marginTop: 16, padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Dernière Notification Reçue:</Text>
                <Text style={{ marginTop: 5 }}>Titre: {notification.request.content.title}</Text>
                <Text>Corps: {notification.request.content.body}</Text>
              </View>
            )}

            <View style={{ backgroundColor: '#fff3cd', borderRadius: 8, marginTop: 16, padding: 10 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Instructions de Test:</Text>
              <Text style={{ fontSize: 11 }}>
                1. Copiez votre FCM Token ci-dessus{'\n'}
                2. Allez sur Firebase Console → Cloud Messaging{'\n'}
                3. Cliquez "Send test message"{'\n'}
                4. Collez votre FCM token et envoyez{'\n'}
                {'\n'}
                Ou envoyez via cURL/Postman vers:{'\n'}
                https://fcm.googleapis.com/v1/projects/ludora-app-475110/messages:send
              </Text>
            </View>
          </View>
        )}
      </Header>
    </ReanimatedBox>
  );
}
