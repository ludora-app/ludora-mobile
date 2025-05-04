import { Wrapper } from '@chillUI';

import sessionsMocks from '../mocks/sessions-mocks';
import SessionCardList from '../components/home-session-card-list.component';

export default function HomeScreen() {
  return (
    <Wrapper className="mt-5">
      <SessionCardList sessions={sessionsMocks} />
    </Wrapper>
  );
}
