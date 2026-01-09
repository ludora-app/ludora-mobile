import { Icon, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { cn, ScalePressable } from '@chillui/ui';

import COLORS from '@/constants/COLORS';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';

import { CreateSessionStep1Part4ItemProps } from './create-session-step-1-part-4.component';

export default function CreateSessionStep1Part4Item(props: CreateSessionStep1Part4ItemProps) {
  const { t } = useTranslate();
  const { icon, visibility } = props;
  const sessionVisibility = useCreateSessionStore(state => state.session.visibility);
  const setCreateSessionVisibility = useCreateSessionStore(state => state.setSession);

  return (
    <ScalePressable
      onPress={() => setCreateSessionVisibility({ visibility })}
      className={cn(
        'flex-1 items-center rounded-lg border-2 px-4 py-3',
        sessionVisibility === visibility ? 'border-primary bg-primary/10' : 'border-ring bg-white',
      )}
    >
      <Icon name={icon} size="sm" color={sessionVisibility === visibility ? COLORS.primary : '#000'} />
      <String size="xs" font={sessionVisibility === visibility ? 'primaryBold' : 'primaryRegular'}>
        {t(`common.session_visibility_${visibility}`)}
      </String>
      <String variant="body-xs" className="text-center" colorVariant="muted">
        {t(`common.session_visibility_description_${visibility}`)}
      </String>
    </ScalePressable>
  );
}
