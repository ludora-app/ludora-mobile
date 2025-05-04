import React from 'react';
import { Pressable } from 'react-native';
import { tv, VariantProps } from 'tailwind-variants';

import cn from '../cn/cn';
import { Box } from '../box';
import { Icon } from '../icon';

export const checkboxVariants = tv({
  base: 'size-5 rounded-md border border-ring',
  variants: {
    showIcon: { false: 'p-0.5', true: 'p-0' },
    size: { md: 'size-6', sm: 'size-5', xs: 'size-4' },
    type: { rounded: 'rounded-full', square: 'rounded-md' },
  },
});

export const subCheckboxVariants = tv({
  variants: {
    checked: { false: '!bg-transparent' },
    type: { rounded: 'rounded-full', square: 'rounded-md' },
    variant: { primary: 'bg-primary', secondary: 'bg-secondary' },
  },
});

type CheckboxProps = {
  type?: VariantProps<typeof checkboxVariants>['type'];
  variant?: VariantProps<typeof subCheckboxVariants>['variant'];
  size?: VariantProps<typeof checkboxVariants>['size'];
  showIcon?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export default function Checkbox({
  checked = false,
  onChange,
  showIcon = true,
  size = 'md',
  type = 'square',
  variant = 'primary',
  ...props
}: CheckboxProps) {
  const handleChange = (isChecked: boolean) => {
    onChange?.(isChecked);
  };

  return (
    <Box
      className={cn(checkboxVariants({ showIcon, size, type }))}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Pressable
        className={cn('h-full w-full items-center justify-center', subCheckboxVariants({ checked, type, variant }))}
        onPress={() => handleChange(!checked)}
      >
        {showIcon && <Icon variant="check-solid" color="white" className="size-4" />}
      </Pressable>
    </Box>
  );
}
