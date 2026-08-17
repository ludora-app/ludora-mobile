import { cn } from '@chillui/ui';
import { memo, useState } from 'react';
import { useTranslate } from '@tolgee/react';

import { TIconsAll } from '@/constants/icons.constants';
import { Icon } from '@/components/ludo-ui/components/icon';
import { StringProps } from '@/components/ludo-ui/types/string.types';
import String from '@/components/ludo-ui/components/string/string.component';
import { Wrapper } from '@/components/chill-ui-library/components/wrapper/components/Wrapper';

export type EmptyResultProps = {
  title?: string;
  variant?: 'icon-1' | 'icon-2';
  className?: string;
  iconClassName?: string;
  hasRandomTitle?: boolean;
  randomOptions?: number;
  iconNames?: TIconsAll[];
  center?: boolean;
  stringProps?: StringProps;
};

const RANDOM_OPTIONS = 3;

const getRandomNumber = (nbr: number) => Math.floor(Math.random() * nbr) + 1;

const pickIconName = (iconNames?: TIconsAll[], variant?: EmptyResultProps['variant']): TIconsAll => {
  if (iconNames?.length) {
    return iconNames[Math.floor(Math.random() * iconNames.length)];
  }
  if (variant) {
    return variant === 'icon-1' ? 'ludo-cry' : 'ludo-cry-2';
  }
  return Math.random() < 0.5 ? 'ludo-cry' : 'ludo-cry-2';
};

function EmptyResult(props: EmptyResultProps) {
  const { t } = useTranslate();
  const {
    center,
    className,
    hasRandomTitle,
    iconClassName,
    iconNames,
    randomOptions = RANDOM_OPTIONS,
    stringProps,
    title,
    variant,
  } = props;

  const [iconName] = useState(() => pickIconName(iconNames, variant));
  const [randomTitleIndex] = useState(() => getRandomNumber(hasRandomTitle ? randomOptions : 5));

  let resolvedTitle = t(`common.empty_result_title_v_${randomTitleIndex}`);
  if (hasRandomTitle && title) {
    resolvedTitle = t(`${title}_${randomTitleIndex}`);
  } else if (title) {
    resolvedTitle = t(title);
  }
  return (
    <Wrapper className={cn('items-center gap-4', className, { 'mt-10': !center })}>
      <Icon name={iconName} className={cn('size-36', iconClassName)} />
      <String className="text-center" {...stringProps}>
        {resolvedTitle}
      </String>
    </Wrapper>
  );
}

export default memo(EmptyResult);
