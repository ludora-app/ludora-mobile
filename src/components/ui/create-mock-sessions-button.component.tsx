import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import COLORS from '@/constants/COLORS';
import { useCreateMockSessions } from '@/hooks/useCreateMockSessions';

interface CreateMockSessionsButtonProps {
  count?: number;
  userUid?: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonDisabled: {
    backgroundColor: COLORS.gray,
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
});

export default function CreateMockSessionsButton({
  count = 10,
  onError,
  onSuccess,
  userUid = 'test-user',
}: CreateMockSessionsButtonProps) {
  const { createMockSessions, isPending } = useCreateMockSessions({
    count,
    onError,
    onSuccess,
    userUid,
  });

  return (
    <Pressable
      disabled={isPending}
      onPress={createMockSessions}
      style={[styles.button, isPending && styles.buttonDisabled]}
    >
      <View style={styles.container}>
        {isPending && <ActivityIndicator color="white" />}
        <Text style={styles.buttonText}>{isPending ? 'Creating Sessions...' : 'Create Mock Sessions'}</Text>
      </View>
    </Pressable>
  );
}
