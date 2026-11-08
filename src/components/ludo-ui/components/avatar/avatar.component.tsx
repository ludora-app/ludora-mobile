import { StyleSheet } from 'react-native';
import { Avatar as AvatarChillUi, AvatarContent, AvatarImage, cn } from '@chillui/ui';

import { getAvatarBackgroundClassName } from '@/utils/avatar.utils';

import { AvatarProps } from '../../types/avatar.types';

const styles = StyleSheet.create({
  initials: { includeFontPadding: false, textAlignVertical: 'center' },
});

export default function Avatar(props: AvatarProps) {
  const { className, colorVariant, contentProps, data, hasRandomColor = false, ...rest } = props;
  const { firstname, id, imageUrl, lastname } = data || {};

  return (
    <AvatarChillUi
      {...rest}
      className={cn(
        { 'border-secondary': colorVariant === 'secondary' },
        hasRandomColor && getAvatarBackgroundClassName(id ?? `${firstname}${lastname ?? ''}`),
        className,
      )}
    >
      <AvatarContent
        firstname={firstname}
        lastname={lastname}
        colorVariant={hasRandomColor ? 'white' : colorVariant}
        {...contentProps}
        className={cn({ 'leading-5': hasRandomColor }, contentProps?.className)}
        style={[hasRandomColor && styles.initials, contentProps?.style]}
      />
      {imageUrl && <AvatarImage source={imageUrl} />}
    </AvatarChillUi>
  );
}
