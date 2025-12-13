import { Platform } from 'react-native';

import BottomSheetIos from './BottomSheetIos';
import { BottomSheetProps } from '../utils/types';
import BottomSheetAndroid from './BottomSheetAndroid';

export default function BottomSheet(props: BottomSheetProps) {
  const { screen } = props;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return Platform.OS === 'ios' && screen ? <BottomSheetIos {...props} /> : <BottomSheetAndroid {...props} />;
}
