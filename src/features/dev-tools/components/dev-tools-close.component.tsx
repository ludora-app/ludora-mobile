import { useRouter } from 'expo-router';

import Button from '@/components/ludo-ui/components/chip/chip.component';

export default function DevToolsClose() {
  const router = useRouter();
  return <Button title="Fermer" variant="outlined" onPress={() => router.back()} />;
}
