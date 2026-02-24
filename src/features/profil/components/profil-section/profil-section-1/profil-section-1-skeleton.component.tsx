import { BoxRow, Skeleton } from '@ludo/ui';
import { BoxGrow, BoxRowGrow } from '@chillui/ui';





export default function ProfilSection1Skeleton() {

  return (
    <BoxRow className='items-center'>
      <BoxRowGrow className='gap-2'>
        <Skeleton variant="circle" size="xs" />
        <BoxGrow className='gap-1 items-center justify-center'>
          <Skeleton variant="text" size="sm" />
          <Skeleton variant="text" size="sm" />
        </BoxGrow>
      </BoxRowGrow>
    </BoxRow>
  );
}
