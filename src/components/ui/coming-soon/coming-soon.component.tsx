import { cn } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { BoxCenter, Icon, String } from '@ludo/ui';

type ComingSoonProps = {
  className?: string;
  titleKey?: string;
};

export default function ComingSoon(props: ComingSoonProps) {
  const { className, titleKey = 'common.coming_functionality_soon' } = props;
  const { t } = useTranslate();

  return (
    <BoxCenter className={cn('flex-1 justify-start gap-1 bg-background pt-4', className)}>
      <Icon name="ludo-sunglass" className="size-40" />
      <String className="text-center">{t(titleKey)}</String>
    </BoxCenter>
  );
}
