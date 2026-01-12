import { tv } from 'tailwind-variants';

export const numericInputFieldTv = tv({
  base: 'text-center',
  defaultVariants: {
    size: 'md',
  },
  variants: {
    font: {
      primaryBold: 'font-primary_bold_font',
      primaryExtraBold: 'font-primary_extra_bold_font',
      primaryExtraLight: 'font-primary_extra_light_font',
      primaryItalic: 'font-primary_italic_font',
      primaryLight: 'font-primary_light_font',
      primaryMedium: 'font-primary_medium_font',
      primaryRegular: 'font-primary_regular_font',
      primarySemiBold: 'font-primary_semi_bold_font',
      primaryThin: 'font-primary_thin_font',
      secondaryBold: 'font-secondary_bold_font',
      secondaryExtraBold: 'font-secondary_extra_bold_font',
      secondaryExtraLight: 'font-secondary_extra_light_font',
      secondaryItalic: 'font-secondary_italic_font',
      secondaryLight: 'font-secondary_light_font',
      secondaryMedium: 'font-secondary_medium_font',
      secondaryRegular: 'font-secondary_regular_font',
      secondarySemiBold: 'font-secondary_semi_bold_font',
      secondaryThin: 'font-secondary_thin_font',
      tertiaryBold: 'font-tertiary_bold_font',
      tertiaryExtraBold: 'font-tertiary_extra_bold_font',
      tertiaryExtraLight: 'font-tertiary_extra_light_font',
      tertiaryItalic: 'font-tertiary_italic_font',
      tertiaryLight: 'font-tertiary_light_font',
      tertiaryMedium: 'font-tertiary_medium_font',
      tertiaryRegular: 'font-tertiary_regular_font',
      tertiarySemiBold: 'font-tertiary_semi_bold_font',
      tertiaryThin: 'font-tertiary_thin_font',
    },
    size: {
      lg: 'text-[18px] py-[14px]',
      md: 'text-[16px] py-[12px]',
      sm: 'text-[14px] py-[8px]',
      xl: 'text-[20px] py-[16px]',
    },
  },
});

export const numericInputContainerTv = tv({
  base: 'flex flex-row items-center rounded-lg border border-[#D1D5DB] bg-[#FFF] px-3',
  variants: {
    isDisabled: {
      true: 'opacity-50',
    },
  },
});

export const numericInputButtonTv = tv({
  base: 'items-center justify-center',
  compoundVariants: [
    // Outlined variants
    {
      className: 'border-button-accent-background',
      color: 'accent',
      variant: 'outlined',
    },
    {
      className: 'border-button-dark-background',
      color: 'dark',
      variant: 'outlined',
    },
    {
      className: 'border-button-error-background',
      color: 'error',
      variant: 'outlined',
    },
    {
      className: 'border-button-info-background',
      color: 'info',
      variant: 'outlined',
    },
    {
      className: 'border-button-light-background',
      color: 'light',
      variant: 'outlined',
    },
    {
      className: 'border-button-primary-background',
      color: 'primary',
      variant: 'outlined',
    },
    {
      className: 'border-button-secondary-background',
      color: 'secondary',
      variant: 'outlined',
    },
    {
      className: 'border-button-success-background',
      color: 'success',
      variant: 'outlined',
    },
    {
      className: 'border-button-warning-background',
      color: 'warning',
      variant: 'outlined',
    },
    {
      className: 'border-button-danger-background',
      color: 'danger',
      variant: 'outlined',
    },
    {
      className: 'border-button-neutral-background',
      color: 'neutral',
      variant: 'outlined',
    },
    {
      className: 'border-button-muted-background',
      color: 'muted',
      variant: 'outlined',
    },
    {
      className: 'border-button-tertiary-background',
      color: 'tertiary',
      variant: 'outlined',
    },
    {
      className: 'border-button-inverted-background',
      color: 'inverted',
      variant: 'outlined',
    },
    {
      className: 'border-button-white-background',
      color: 'white',
      variant: 'outlined',
    },
  ],
  variants: {
    color: {
      accent: 'bg-button-accent-background',
      danger: 'bg-button-danger-background',
      dark: 'bg-button-dark-background',
      error: 'bg-button-error-background',
      info: 'bg-button-info-background',
      inverted: 'bg-button-inverted-background',
      light: 'bg-button-light-background',
      muted: 'bg-button-muted-background',
      neutral: 'bg-button-neutral-background',
      primary: 'bg-button-primary-background',
      secondary: 'bg-button-secondary-background',
      success: 'bg-button-success-background',
      tertiary: 'bg-button-tertiary-background',
      warning: 'bg-button-warning-background',
      white: 'bg-button-white-background',
    },
    isDisabled: {
      true: 'opacity-50',
    },
    size: {
      lg: 'p-3',
      md: 'p-2',
      sm: 'p-1',
      xl: 'p-4',
    },
    variant: {
      contained: 'border-transparent',
      outlined: 'bg-transparent border',
    },
  },
});
