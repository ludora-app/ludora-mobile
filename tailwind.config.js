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
        background: '#F2F4F8',
        bluePrimary: '#97CDCC',
        blueSecondary: '#6AAFAD',
        border: '#e4e4e4',
        button: {
          accent: {
            background: '#CBD2D9',
            content: '#FF0000',
          },
          danger: {
            background: '#FF0000',
            content: '#FFF',
          },
          dark: {
            background: '#323F4B',
            content: '#FFF',
          },
          disabled: {
            background: '#CBD2D9',
            content: '#666',
          },
          error: {
            background: '#FF0000',
            content: '#FFF',
          },
          info: {
            background: '#6EE7B7',
            content: '#000',
          },
          inverted: {
            background: '#F5F7FA',
            content: '#F15924',
          },
          light: {
            background: '#F5F7FA',
            content: '#000',
          },
          muted: {
            background: '#CBD2D9',
            content: '#666',
          },
          neutral: {
            background: '#CBD2D9',
            content: '#333',
          },
          primary: {
            background: '#F15924',
            content: '#FFF',
          },
          secondary: {
            background: '#CBD2D9',
            content: '#FCD34D',
          },
          warning: {
            background: '#FCD34D',
            content: '#000',
          },
          white: {
            background: '#F5F7FA',
            content: '#000',
          },
        },
        danger: '#FF0000',
        darkLight: '#0000001A',
        destructive: '#A52523',
        error: '#ff3333',
        gray: '#7C7C7C',
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
        primary_bold: ['NunitoSans700Bold', 'sans-serif'],
        primary_extra_bold: ['NunitoSans800ExtraBold', 'sans-serif'],
        primary_italic: ['NunitoSans400RegularItalic', 'sans-serif'],
        primary_light: ['NunitoSans300Light', 'sans-serif'],
        primary_medium: ['NunitoSans600SemiBold', 'sans-serif'],
        primary_medium_italic: ['NunitoSans600SemiBoldItalic', 'sans-serif'],
        primary_regular: ['NunitoSans400Regular', 'sans-serif'],
        primary_semi_bold: ['NunitoSans600SemiBold', 'sans-serif'],
      },
      text: {
        title: 'text-xl font-nunitoSemiBold text-dark',
      },
    },
  },
};
