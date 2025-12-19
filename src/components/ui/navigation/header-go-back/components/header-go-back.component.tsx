import { useRouter } from 'expo-router';
import { Box, IconButton, WrapperSafeAreaView } from '@ludo/ui';

export default function HeaderGoBack() {
  const router = useRouter();
  return (
    <WrapperSafeAreaView fill={false} edges={['top']} className="mb-10 pt-3">
      <Box className="self-start">
        <IconButton
          iconName="arrow-left-regular"
          className="rounded-xl border-[1px] border-[#D8DADC] bg-transparent"
          iconColor="#000"
          as="scale-pressable"
          onPress={() => router.back()}
        />
      </Box>
    </WrapperSafeAreaView>
  );
}
