import { BoxRow } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import Animated, { FadeIn } from 'react-native-reanimated';

import { CreateSessionFromRequestDtoVisibility } from '@/api/generated/model';
import { CreateSessionStep1Part4ItemProps } from '@/features/create-session/types/create-session-step-1-part-4.types';

import CreateSessionSubtitle from '../../../create-session-subtitle-component';
import CreateSessionStep1Part4Item from './create-session-step-1-part-4-item.component';

const items: CreateSessionStep1Part4ItemProps[] = [
  {
    icon: 'people-regular',
    id: 1,
    visibility: CreateSessionFromRequestDtoVisibility.PUBLIC,
  },
  {
    icon: 'hidden-lock-regular',
    id: 2,
    visibility: CreateSessionFromRequestDtoVisibility.PRIVATE,
  },
];

export default function CreateSessionStep1Part4() {
  const { t } = useTranslate();

  return (
    <Animated.View entering={FadeIn}>
      <CreateSessionSubtitle title={t('create-session-steps.step-1.select_visibility_title')} />
      <BoxRow className="gap-2">
        {items.map(item => (
          <CreateSessionStep1Part4Item key={item.id} {...item} />
        ))}
      </BoxRow>
    </Animated.View>
  );
}
