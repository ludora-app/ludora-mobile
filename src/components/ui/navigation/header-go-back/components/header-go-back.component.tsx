import { cn } from '@chillui/ui';
import { useRouter } from 'expo-router';
import { Box, IconButton, WrapperSafeAreaView } from '@ludo/ui';

type HeaderGoBackProps = {
  className?: string;
};

export default function HeaderGoBack(props: HeaderGoBackProps) {
  const { className } = props;
  const router = useRouter();
  return (
    <WrapperSafeAreaView fill={false} className={cn('pb-10 pt-3', className)}>
      <Box className="flex-row items-center">
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
