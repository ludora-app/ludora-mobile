import { useRouter } from 'expo-router';
import { BoxRow, BoxRowCenterBetween, Icon, Wrapper } from '@ludo/ui';

export default function SessionSectionImagesHeader() {
  const router = useRouter();
  return (
    <Wrapper>
      <BoxRowCenterBetween className="w-full">
        {/* <Box className="rounded-full bg-black/30 p-2"> */}
        <Icon name="arrow-left-regular" onPress={router.back} className="rounded-full bg-black/30" />

        <BoxRow className="items-center gap-2">
          <Icon name="share-regular" className="rounded-full bg-black/30" onPress={() => { }} />

          <Icon name="heart-regular" className="rounded-full bg-black/30" onPress={() => { }} />
        </BoxRow>
      </BoxRowCenterBetween>
    </Wrapper>
  );
}
