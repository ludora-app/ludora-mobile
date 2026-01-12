import { IconButton } from '@ludo/ui';
import { Share, Alert } from 'react-native';

import COLORS from '@/constants/COLORS';

export default function ShareButton() {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        // Sur Android, le lien doit être dans 'message'
        message: 'Regarde ce que j’ai trouvé sur Ludo ! https://ton-lien.com',
        // Sur iOS, tu peux séparer l'URL et le titre
        title: 'Partager l’invitation',
        url: 'https://ton-lien.com',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Partagé avec un type d'activité spécifique (iOS)
        } else {
          // Partagé
        }
      } else if (result.action === Share.dismissedAction) {
        // Modal fermée sans partage
      }
    } catch {
      Alert.alert('Oups', "Impossible d'ouvrir le partage.");
    }
  };
  return (
    <IconButton
      as="scale-pressable"
      onPress={handleShare}
      iconName="share-solid"
      variant="outlined"
      iconColor={COLORS.primary}
      className="rounded-full p-3"
    />
  );
}
