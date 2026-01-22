import { Link } from 'expo-router';
import { Chip as ChipChillUI, ChipContent, ChipIcon, ChipLoader, ChipTitle, cn } from '@chillui/ui';

import { Image } from '../image';
import { ChipProps } from '../../types/chip.types';

export default function Button(props: ChipProps) {
  const { className, contentProps, iconProps, image, isDisabled, isLoading, redirect, title, titleProps, ...rest } =
    props;

  const { position: iconPosition, ...iconPropsRest } = iconProps || {};

  const buttonContent = (
    <ChipChillUI
      as="scale-pressable"
      className={cn('rounded-full', className)}
      isDisabled={isLoading || isDisabled}
      {...rest}
    >
      {!isLoading && iconProps && iconPosition === 'left-outside' && <ChipIcon {...iconPropsRest} />}
      <ChipContent {...contentProps}>
        {image?.source && <Image source={image?.source} contentFit={image.contentFit} className={image.className} />}
        {!isLoading && iconProps && iconPosition === 'left' && <ChipIcon {...iconPropsRest} />}
        {!isLoading && (
          <ChipTitle font="primaryBold" {...titleProps}>
            {title}
          </ChipTitle>
        )}
        {isLoading && <ChipLoader name="swing" color="#FFF" />}
        {!isLoading && iconProps && iconPosition === 'right' && <ChipIcon {...iconPropsRest} />}
      </ChipContent>
      {!isLoading && iconProps && iconPosition === 'right-outside' && <ChipIcon {...iconPropsRest} />}
    </ChipChillUI>
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
