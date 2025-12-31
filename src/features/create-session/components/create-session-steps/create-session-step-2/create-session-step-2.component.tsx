import { Dayjs } from 'dayjs';
import { Wrapper } from '@ludo/ui';
import { useForm } from 'react-hook-form';

import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';

import CreateSessionStep2Fields from './create-session-step-2-fields-list/create-session-step-2-fields-list.component';

export default function CreateSessionStep2() {
  const setSession = useCreateSessionStore(state => state.setSession);
  const { control } = useForm();

  const onSelectDay = (day: Dayjs) => {
    setSession({ day: day.toISOString() });
  };

  return (
    <Wrapper fill>
      <CreateSessionStep2Fields />
    </Wrapper>
  );
}
