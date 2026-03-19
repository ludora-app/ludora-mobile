import { cn } from '@chillui/ui';
// import { profilRatingCard1 } from 'assets'
import { useTranslate } from '@tolgee/react';
import { VariantProps } from 'tailwind-variants';
import { Box, BoxRow, Image, String } from '@ludo/ui'

import { getSportImage } from '@/utils/sports.utils';

import { ratingCardRateNameSizeTv, ratingCardRatesContainerSizeTv, ratingCardRateSizeTv, ratingCardRatesSizeTv, ratingCardSportImageTv, ratingCardTv, ratingCardUserImageTv } from './rating-card.styles';

type RatingCardProps = {
  size?: VariantProps<typeof ratingCardTv>['size'];
}

export default function RatingCard(props: RatingCardProps) {
  const { t } = useTranslate();
  const { size = 'xs' } = props;

  const sportImage = getSportImage("BASKETBALL");

  return (
    <Box className={ratingCardTv({ size })}>
      <Box className='absolute size-full bg-black/50 z-40' />
      <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'>
        <String color='#FFF' font="primaryBold">
          {t("common.coming_soon")}
        </String>
      </Box>
      {/* <Image source={profilRatingCard1} className='absolute top-0 left-0 right-0 bottom-0' contentFit='contain' /> */}
      <Box className={cn('h-2/3 items-center justify-center', ratingCardRatesContainerSizeTv({ size }))}>
        <Image source={{ uri: "https://picsum.photos/200/300" }} className={cn('absolute rounded-full opacity-50', ratingCardUserImageTv({ size }))} />
        <Image source={sportImage} className={ratingCardSportImageTv({ size })} />
        <Box className='items-center'>
          <String font="primaryBold" colorVariant="white" className={ratingCardRateSizeTv({ size })}>
            98
          </String>
          <String font="primaryBold" colorVariant="white" className={ratingCardRateNameSizeTv({ size })}>Amir</String>
        </Box>
      </Box>
      <Box>
        <BoxRow className='items-center justify-around'>
          <Box className='ml-4'>
            <BoxRow className='gap-1 items-center'>
              <String font="primaryBold" colorVariant="white" className={ratingCardRatesSizeTv({ size })}>96</String>
              <String font="primaryBold" colorVariant="white" className={ratingCardRatesSizeTv({ size })}>VIT</String>
            </BoxRow>
            <BoxRow className='gap-1 items-center'>
              <String font="primaryBold" colorVariant="white" className={ratingCardRatesSizeTv({ size })}>96</String>
              <String font="primaryBold" colorVariant="white" className={ratingCardRatesSizeTv({ size })}>TEC</String>
            </BoxRow>
          </Box>
          <Box className='mr-4'>
            <BoxRow className='gap-1 items-center'>
              <String font="primaryBold" colorVariant="white" className={ratingCardRatesSizeTv({ size })}>96</String>
              <String font="primaryBold" colorVariant="white" className={ratingCardRatesSizeTv({ size })}>TIR</String>
            </BoxRow>
            <BoxRow className='gap-1 items-center'>
              <String font="primaryBold" colorVariant="white" className={ratingCardRatesSizeTv({ size })}>96</String>
              <String font="primaryBold" colorVariant="white" className={ratingCardRatesSizeTv({ size })}>PAS</String>
            </BoxRow>
          </Box>
        </BoxRow>
        <BoxRow className='gap-1 items-center justify-center'>
          <String font="primaryBold" colorVariant="white" className={ratingCardRatesSizeTv({ size })}>96</String>
          <String font="primaryBold" colorVariant="white" className={ratingCardRatesSizeTv({ size })}>DEF</String>
        </BoxRow>
      </Box>
    </Box>
  )
}