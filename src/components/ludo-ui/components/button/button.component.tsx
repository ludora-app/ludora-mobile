import { Link } from 'expo-router';
import { Button as ButtonChillUI, ButtonContent, ButtonIcon, ButtonTitle, cn } from '@chillui/ui';

import { ButtonProps } from '../../types/button.types';

export default function Button(props: ButtonProps) {
  const { className, contentProps, iconProps, redirect, title, titleProps, ...rest } = props;

  const buttonContent = (
    <ButtonChillUI as="scale-pressable" className={cn('rounded-full', className)} {...rest}>
      <ButtonContent {...contentProps}>
        {iconProps && iconProps.position === 'left' && <ButtonIcon {...iconProps} />}
        <ButtonTitle font="primaryBold" {...titleProps}>
          {title}
        </ButtonTitle>
        {iconProps && iconProps.position !== 'left' && <ButtonIcon {...iconProps} />}
      </ButtonContent>
    </ButtonChillUI>
  );

  if (redirect) {
    return (
      <Link href={redirect} asChild>
        {buttonContent}
      </Link>
    );
  }
  return buttonContent;
}
