import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Button as ButtonChillUI, ButtonContent, ButtonIcon, ButtonLoader, ButtonTitle, cn } from '@chillui/ui';

import { ButtonProps } from '../../types/button.types';

export default function Button(props: ButtonProps) {
  const { className, contentProps, iconProps, image, isDisabled, isLoading, redirect, title, titleProps, ...rest } =
    props;

  const buttonContent = (
    <ButtonChillUI
      as="scale-pressable"
      className={cn('rounded-full', className)}
      isDisabled={isLoading || isDisabled}
      {...rest}
    >
      <ButtonContent {...contentProps}>
        {image?.source && <Image source={image?.source} contentFit={image.contentFit} className={image.className} />}
        {!isLoading && iconProps && iconProps.position === 'left' && <ButtonIcon {...iconProps} />}
        {!isLoading && (
          <ButtonTitle font="primaryBold" {...titleProps}>
            {title}
          </ButtonTitle>
        )}
        {isLoading && <ButtonLoader name="swing" color="#FFF" />}
        {!isLoading && iconProps && iconProps.position !== 'left' && <ButtonIcon {...iconProps} />}
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
