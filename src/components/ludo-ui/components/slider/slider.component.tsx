import { Slider as SliderChillUi, SliderLabel, SliderRange, SliderTrack, SliderThumb } from '@chillui/ui';

import { SliderProps } from '../../types';

export default function Slider(props: SliderProps) {
  const { labelTitle, rangeClassName, thumbClassName, trackClassName, ...rest } = props;
  return (
    <SliderChillUi defaultValue={50} {...rest}>
      <SliderTrack className={trackClassName}>
        <SliderRange className={rangeClassName} />
      </SliderTrack>
      <SliderThumb className={thumbClassName} />
      {!!labelTitle && <SliderLabel position="top">{labelTitle}</SliderLabel>}
    </SliderChillUi>
  );
}
