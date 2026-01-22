import { memo } from 'react';
import { cn } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';

import { TIconsAll } from '@/constants/ICONS';
import { Wrapper } from '@/components/ludo-ui/components/wrapper';

import Icon from '../../ludo-ui/components/icon/Icon.component';
import String from '../../ludo-ui/components/string/string.component';

export type EmptyResultProps = {
  title?: string;
  variant?: 'icon-1' | 'icon-2';
  className?: string;
  iconClassName?: string;
  hasRandomTitle?: boolean;
  randomOptions?: number;
};

const RANDOM_OPTIONS = 3;

function EmptyResult(props: EmptyResultProps) {
  const { t } = useTranslate();
  const { className, hasRandomTitle, iconClassName, randomOptions = RANDOM_OPTIONS, title, variant } = props;

  const getIconName = (): TIconsAll => {
    if (variant) {
      return variant === 'icon-1' ? 'ludo-cry' : 'ludo-cry-2';
    }
    return Math.random() < 0.5 ? 'ludo-cry' : 'ludo-cry-2';
  };

  const getRandomNumber = (nbr: number) => Math.floor(Math.random() * nbr) + 1;

  const handleTitle = () => {
    if (hasRandomTitle && title) {
      return t(`${title}_${getRandomNumber(randomOptions)}`);
    }
    if (title) {
      return t(title);
    }
    return t(`common.empty_result_title_v_${getRandomNumber(5)}`);
  };

  const iconName = getIconName();
  return (
    <Wrapper className={cn('bg-background mt-14 grow items-center gap-4', className)}>
      <Icon name={iconName} className={cn('size-36', iconClassName)} />
      <String className="text-center">{handleTitle()}</String>
    </Wrapper>
  );
}

export default memo(EmptyResult);
