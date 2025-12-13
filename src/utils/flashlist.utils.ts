import { useBenchmark, FlashListRef } from '@shopify/flash-list';

type UseFlaslistBenchmarkProps = {
  flashListRef: React.RefObject<FlashListRef<any>>;
  repeatCount?: number;
  speedMultiplier?: number;
  startManually?: boolean;
};

export const useFlaslistBenchmark = (props: UseFlaslistBenchmarkProps) => {
  const { flashListRef, repeatCount = 3, speedMultiplier = 1.5, startManually = false } = props;

  const { isBenchmarkRunning, startBenchmark } = useBenchmark(
    flashListRef,
    result => {
      if (!result.interrupted) {
        console.log(result.formattedString);
      }
    },
    {
      repeatCount,
      speedMultiplier,
      startManually,
    },
  );

  return {
    isBenchmarkRunning,
    startBenchmark,
  };
};
