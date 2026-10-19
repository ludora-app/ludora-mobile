import { Box } from '@ludo/ui';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import COLORS from '@/constants/colors.contstants';

import { WELCOME_PREVIEW_MATCHES } from '../../constants/welcome.constants';
import { WelcomeMatchesPreviewCard } from './welcome-matches-preview-card.component';

const FADE_COLORS = [`${COLORS.background}00`, COLORS.background] as const;

const styles = StyleSheet.create({
  fade: {
    bottom: -1,
    height: 70,
    left: -20,
    position: 'absolute',
    right: -20,
  },
});

export const WelcomeMatchesPreview = () => (
    <Box className="gap-2.5">
      {WELCOME_PREVIEW_MATCHES.map(match => (
        <WelcomeMatchesPreviewCard key={match.id} match={match} />
      ))}
      <LinearGradient colors={FADE_COLORS} style={styles.fade} pointerEvents="none" />
    </Box>
  );
