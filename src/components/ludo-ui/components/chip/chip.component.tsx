import { Link } from 'expo-router';
import { Image } from 'expo-image';
import { Chip as ChipChillUI, ChipContent, ChipIcon, ChipLoader, ChipTitle, cn } from '@chillui/ui';

import { ChipProps } from '../../types/chip.types';

export default function Button(props: ChipProps) {
  const { className, contentProps, iconProps, image, isDisabled, isLoading, redirect, title, titleProps, ...rest } =
    props;

  const buttonContent = (
    <ChipChillUI
      as="scale-pressable"
      className={cn('rounded-full', className)}
      isDisabled={isLoading || isDisabled}
      {...rest}
    >
      <ChipContent {...contentProps}>
        {image?.source && <Image source={image?.source} contentFit={image.contentFit} className={image.className} />}
        {!isLoading && iconProps && iconProps.position === 'left' && <ChipIcon {...iconProps} />}
        {!isLoading && (
          <ChipTitle font="primaryBold" {...titleProps}>
            {title}
          </ChipTitle>
        )}
        {isLoading && <ChipLoader name="swing" color="#FFF" />}
        {!isLoading && iconProps && iconProps.position !== 'left' && <ChipIcon {...iconProps} />}
      </ChipContent>
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
