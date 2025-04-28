import { Stack } from 'expo-router';
import GoBackHeader from '@/components/ui/GoBackHeader';

const header = () => <GoBackHeader />;

export default function RegisterLayout() {
  return <Stack screenOptions={{ header: () => header() }} />;
}
