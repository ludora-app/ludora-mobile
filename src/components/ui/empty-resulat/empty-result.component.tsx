import { memo } from 'react';
import { Wrapper } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';

import { TIconsAll } from '@/constants/ICONS';

import Icon from '../../ludo-ui/components/icon/Icon.component';
import String from '../../ludo-ui/components/string/string.component';

type EmptyResultProps = {
  title?: string;
  variant?: 'icon-1' | 'icon-2';
};

function EmptyResult(props: EmptyResultProps) {
  const { t } = useTranslate();
  const { title, variant } = props;

  const getIconName = (): TIconsAll => {
    if (variant) {
      return variant === 'icon-1' ? 'ludo-cry' : 'ludo-cry-2';
    }
    return Math.random() < 0.5 ? 'ludo-cry' : 'ludo-cry-2';
  };

  const getRandomNumber = () => Math.floor(Math.random() * 3) + 1;

  const iconName = getIconName();
  return (
    <Wrapper className="mt-14 items-center gap-4">
      <Icon name={iconName} className="size-36" />
      {!!title && <String className="text-center">{t(`${title}_${getRandomNumber()}`)}</String>}
    </Wrapper>
  );
}

export default memo(EmptyResult);
