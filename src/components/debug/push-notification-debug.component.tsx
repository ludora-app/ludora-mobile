import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import * as Notifications from 'expo-notifications';
import { Alert, Button, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { usePushNotifications } from '@/hooks/use-push-notifications.hook';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 16,
    padding: 16,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
  },
  errorText: {
    color: '#c62828',
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  instructions: {
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    marginTop: 16,
    padding: 10,
  },
  instructionsText: {
    fontSize: 11,
    lineHeight: 16,
  },
  instructionsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  loadingText: {
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  spacer: {
    height: 12,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    color: '#2e7d32',
    fontSize: 12,
    fontWeight: '600',
  },
  tokenContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
    padding: 10,
  },
  tokenText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 9,
  },
});

export function PushNotificationDebug() {
  const { error, fcmToken, isLoading } = usePushNotifications();
  const [lastNotification, setLastNotification] = useState<Notifications.Notification | null>(null);

  const copyToken = async () => {
    if (fcmToken) {
      await Clipboard.setStringAsync(fcmToken);
      Alert.alert('✅ Token copié!', 'Le token FCM a été copié dans le presse-papier');
    }
  };

  const sendLocalNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          body: 'Ceci est une notification de test locale!',
          data: { testData: 'test data', timestamp: Date.now() },
          sound: 'default',
          title: 'Test Notification Locale 🎉',
        },
        trigger: {
          seconds: 2,
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        },
      });
      Alert.alert('✅ Planifié!', 'La notification apparaîtra dans 2 secondes');
    } catch (err) {
      Alert.alert('❌ Erreur', `Impossible de planifier la notification: ${err}`);
    }
  };

  const sendImmediateNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          body: 'Cette notification s\'affiche immédiatement',
          data: { immediate: true },
          sound: 'default',
          title: 'Notification Immédiate! ⚡',
        },
        trigger: null, // null = immediate
      });
    } catch (err) {
      Alert.alert('❌ Erreur', `Impossible d'envoyer la notification: ${err}`);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>🔔 Push Notifications - Chargement...</Text>
        <Text style={styles.loadingText}>Initialisation du service de notifications...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🔔 Push Notification Debug</Text>

      {/* Status Badge */}
      {fcmToken && (
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>✅ Service initialisé</Text>
        </View>
      )}

      {/* Error Display */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>❌ Erreur: {error.message}</Text>
        </View>
      )}

      {/* FCM Token Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 FCM Device Token:</Text>
        {fcmToken ? (
          <>
            <View style={styles.tokenContainer}>
              <Text style={styles.tokenText} selectable>
                {fcmToken}
              </Text>
            </View>
            <Button title="📋 Copier le Token" onPress={copyToken} />
          </>
        ) : (
          <Text style={{ color: '#999', fontStyle: 'italic' }}>Aucun token disponible</Text>
        )}
      </View>

      <View style={styles.spacer} />

      {/* Test Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧪 Tests de Notifications:</Text>
        
        <Button title="📱 Notification Immédiate" onPress={sendImmediateNotification} color="#2196F3" />
        
        <View style={styles.spacer} />
        
        <Button title="⏰ Notification dans 2 secondes" onPress={sendLocalNotification} color="#4CAF50" />
      </View>

      {/* Last Notification */}
      {lastNotification && (
        <View style={[styles.section, { backgroundColor: '#e3f2fd', borderRadius: 8, padding: 10 }]}>
          <Text style={styles.sectionTitle}>📩 Dernière Notification:</Text>
          <Text>Titre: {lastNotification.request.content.title}</Text>
          <Text>Corps: {lastNotification.request.content.body}</Text>
        </View>
      )}

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>📖 Instructions de Test:</Text>
        <Text style={styles.instructionsText}>
          {`1. Copiez votre FCM Token ci-dessus
2. Utilisez votre backend pour envoyer une notification
3. Ou testez avec Firebase Console:
   • Cloud Messaging → "Send test message"
   • Collez votre FCM token
   • Envoyez la notification

4. Testez aussi les notifications locales avec les boutons ci-dessus

⚠️ Notes importantes:
• Les notifications ne fonctionnent PAS sur l'émulateur Android sans Google Play Services
• Testez sur un appareil physique pour de meilleurs résultats
• Assurez-vous que l'app est en production ou dev build (pas Expo Go)`}
        </Text>
      </View>

      {/* Backend Info */}
      <View style={[styles.instructions, { backgroundColor: '#e8f5e9', marginTop: 12 }]}>
        <Text style={styles.instructionsTitle}>🔧 Configuration Backend:</Text>
        <Text style={styles.instructionsText}>
          {`Votre backend doit envoyer une notification au format Firebase:

POST https://fcm.googleapis.com/v1/projects/ludora-2fbc6/messages:send

Body:
{
  "message": {
    "token": "${fcmToken?.slice(0, 20)}...",
    "notification": {
      "title": "Test",
      "body": "Message de test"
    },
    "android": {
      "priority": "high"
    }
  }
}`}
        </Text>
      </View>
    </ScrollView>
  );
}
