import { Stack } from 'expo-router';
import GoBackHeader from '@/components/ui/go-back-header.compoent';

const header = () => <GoBackHeader />;

export default function RegisterLayout() {
  return <Stack screenOptions={{ header: () => header() }} />;
}
