import { ChakraTheme } from '@chakra-ui/react'

export const textStyles: ChakraTheme['textStyles'] = {
  display: {
    'small-mobile': {
      weight: 'bold',
      fontSize: '36px',
      lineHeight: '48px',
      fontFamily: 'heading',
    },
    small: {
      weight: 'bold',
      fontSize: '48px',
      lineHeight: '64px',
      fontFamily: 'heading',
    },
    medium: {
      weight: 'bold',
      fontSize: '64px',
      lineHeight: '80px',
      fontFamily: 'heading',
    },
    large: {
      weight: 'bold',
      fontSize: '72px',
      lineHeight: '80px',
      fontFamily: 'heading',
    },
  },
  heading: {
    small: {
      weight: 'semibold',
      fontSize: '24px',
      lineHeight: '32px',
    },
    medium: {
      weight: 'semibold',
      fontSize: '32px',
      lineHeight: '40px',
    },
    large: {
      weight: 'semibold',
      fontSize: '40px',
      lineHeight: '56px',
    },
  },
  label: {
    small: {
      weight: 'semibold',
      fontSize: '13px',
      lineHeight: '16px',
    },
    medium: {
      weight: 'semibold',
      fontSize: '16px',
      lineHeight: '20px',
    },
    large: {
      weight: 'semibold',
      fontSize: '20px',
      lineHeight: '24px',
    },
  },
  paragraph: {
    small: {
      weight: 'medium',
      fontSize: '10px',
      lineHeight: '16px',
    },
    medium: {
      weight: 'medium',
      fontSize: '13px',
      lineHeight: '16px',
    },
    large: {
      weight: 'medium',
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
  number: {
    small: {
      weight: 'medium',
      fontSize: '13px',
      lineHeight: '16px',
    },
    medium: {
      weight: 'medium',
      fontSize: '16px',
      lineHeight: '24px',
    },
    large: {
      weight: 'medium',
      fontSize: '20px',
      lineHeight: '24px',
    },
  },
  overline: {
    weight: 'semibold',
    fontSize: '13px',
    lineHeight: '16px',
    letterSpacing: '10%',
    textTransform: 'uppercase',
  },
} as const
