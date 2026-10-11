import { Link } from 'expo-router';
import { Button as ButtonChillUI, ButtonContent, ButtonIcon, ButtonLoader, ButtonTitle } from '@chillui/ui';

import { Image } from '../image';
import { ButtonProps } from '../../types/button.types';

export default function Button(props: ButtonProps) {
  const { contentProps, iconProps, image, isLoading, loaderProps, redirect, title, titleProps, ...rest } = props;

  const buttonContent = (
    <ButtonChillUI as="scale-pressable" isLoading={isLoading} {...rest}>
      {!isLoading && iconProps && iconProps.position === 'left-outside' && <ButtonIcon {...iconProps} />}
      <ButtonContent {...contentProps}>
        {image?.source && <Image source={image?.source} contentFit={image.contentFit} className={image.className} />}
        {!isLoading && iconProps && iconProps.position === 'left' && <ButtonIcon {...iconProps} />}

        {!isLoading && (
          <ButtonTitle font="primaryBold" {...titleProps} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </ButtonTitle>
        )}

        {isLoading && <ButtonLoader name="swing" {...loaderProps} />}
        {!isLoading && iconProps && iconProps.position === 'right' && <ButtonIcon {...iconProps} />}
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
