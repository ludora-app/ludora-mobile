import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import cn from '../cn/cn';
import { Box } from '../box';
import { StringProps } from '../utils/types';
import String from '../string/components/String';

type CardProps = {
  onPress?: () => void;
} & React.ComponentProps<typeof Box>;

function Card({ className, onPress, ...props }: CardProps) {
  if (onPress) {
    return (
      <Box
        data-slot="card"
        className={cn('rounded-xl bg-white shadow-sm', className)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        <TouchableOpacity onPress={onPress}>{props.children}</TouchableOpacity>
      </Box>
    );
  }
  return (
    <Box
      data-slot="card"
      className={cn('rounded-xl bg-white shadow-sm', className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      className={cn('items-center', className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}
type CardTitleProps = {
  size?: StringProps['size'];
  variant?: StringProps['variant'];
  weight?: StringProps['weight'];
} & React.ComponentProps<typeof Box>;

function CardTitle({ className, size = 'md', variant = 'light', weight = 'semiBold', ...props }: CardTitleProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box data-slot="card-title" className={className} {...props}>
      <String variant={variant} size={size} weight={weight}>
        {props.children}
      </String>
    </Box>
  );
}

type CardDescriptionProps = {
  size?: StringProps['size'];
  variant?: StringProps['variant'];
} & React.ComponentProps<typeof Box>;

function CardDescription({ className, size = 'md', variant = 'dark', ...props }: CardDescriptionProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box className={className} {...props}>
      <String variant={variant} size={size}>
        {props.children}
      </String>
    </Box>
  );
}

function CardAction({ className, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <Box
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<typeof Box>) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Box className={cn(className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<typeof Box>) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box data-slot="card-footer" className={cn('[.border-t]:pt-6 flex items-center px-6', className)} {...props} />
  );
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
