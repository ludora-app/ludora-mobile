/** @type {import('tailwindcss').Config} */
import nativewindPreset from 'nativewind/preset';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
  presets: [nativewindPreset],
  theme: {
    extend: {
      colors: {
        accent: '#CE3728',
        bluePrimary: '#97CDCC',
        blueSecondary: '#6AAFAD',
        border: '#e4e4e4',
        darkLight: '#0000001A',
        destructive: '#A52523',
        input: '#e4e4e4',
        primary: '#F15924',
        primaryHover: '#F14500',
        purplePrimary: '#864C9E',
        purpleSecondary: '#652F8F',
        purpleTertiary: '#3C215A',
        ring: '#9e9e9e',
        secondary: '#FCBD1D',
      },
      fontFamily: {
        nunito: ['NunitoSans300Light', 'sans-serif'],
        nunitoBlack: ['NunitoSans900Black', 'sans-serif'],
        nunitoBlackItalic: ['NunitoSans900BlackItalic', 'sans-serif'],
        nunitoBold: ['NunitoSans700Bold', 'sans-serif'],
        nunitoBoldItalic: ['NunitoSans700BoldItalic', 'sans-serif'],
        nunitoItalic: ['NunitoSans300LightItalic', 'sans-serif'],
        nunitoLight: ['NunitoSans300Light', 'sans-serif'],
        nunitoLightItalic: ['NunitoSans300LightItalic', 'sans-serif'],
        nunitoMedium: ['NunitoSans600SemiBold', 'sans-serif'],
        nunitoMediumItalic: ['NunitoSans600SemiBoldItalic', 'sans-serif'],
        nunitoRegular: ['NunitoSans400Regular', 'sans-serif'],
        nunitoRegularItalic: ['NunitoSans400RegularItalic', 'sans-serif'],
        nunitoSemiBold: ['NunitoSans600SemiBold', 'sans-serif'],
        nunitoSemiBoldItalic: ['NunitoSans600SemiBoldItalic', 'sans-serif'],
      },
    },
  },
};
