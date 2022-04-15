import { motion, MotionProps, Target } from 'framer-motion'
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  Stack,
  StackProps,
  Image,
  ImageProps,
} from '@chakra-ui/react'

export const DEFAULT_DURATION = 0.85
export const DEFAULT_EASING = [0.04, 0.91, 0.6, 0.99]

export const transitionConfig: MotionProps['transition'] = {
  ease: DEFAULT_EASING,
  duration: DEFAULT_DURATION,
}

export const transitionMediumConfig: MotionProps['transition'] = {
  ...transitionConfig,
  duration: 0.4,
}

export const transitionFastConfig: MotionProps['transition'] = {
  ...transitionConfig,
  duration: 0.2,
}

// This sucks
export const MotionBox = motion<
  Omit<BoxProps, keyof MotionProps> & MotionProps
>(Box as any)
export const MotionFlex = motion<
  Omit<FlexProps, keyof MotionProps> & MotionProps
>(Flex as any)
export const MotionStack = motion<
  Omit<StackProps, keyof MotionProps> & MotionProps
>(Stack as any)
export const MotionButton = motion<
  Omit<ButtonProps, keyof MotionProps> & MotionProps
>(Button as any)
export const MotionImage = motion<
  Omit<ImageProps, keyof MotionProps> & MotionProps
>(Image as any)

type InOutProps<T extends keyof Target = keyof Target> = Partial<
  Record<T, [Target[T], Target[T], Target[T]]>
>

type InOutReturn = {
  animate: MotionProps['animate']
  initial: MotionProps['initial']
  exit: MotionProps['exit']
}

/**
 * For use with simple in->out animations.
 * Each animation prop takes an array with 3 properties, [initial, animate, exit]
 */
export const inOut = (customAnimateProps: InOutProps): InOutReturn => {
  const initial = {}
  const animate = {}
  const exit = {}

  for (const key of Object.keys(customAnimateProps)) {
    const [i, a, e] = customAnimateProps[key as keyof InOutProps] || []
    initial[key] = i
    animate[key] = a
    exit[key] = e
  }

  return {
    initial,
    animate,
    exit,
  }
}
