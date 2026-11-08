import { useOnBoardingStore } from '../../stores/on-boarding.store';
import { OnBoardingPlayAreaList } from '../components/on-boarding-play-area/on-boarding-play-area-list.component';
import { OnBoardingPlayAreaMapView } from '../components/on-boarding-play-area/on-boarding-play-area-map/on-boarding-play-area-map-view.component';

export const OnBoardingStep2Screen = () => {
  const isPlayAreaMapVisible = useOnBoardingStore(state => state.isPlayAreaMapVisible);

  return isPlayAreaMapVisible ? <OnBoardingPlayAreaMapView /> : <OnBoardingPlayAreaList />;
};
