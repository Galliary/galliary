import { Center } from '@chakra-ui/layout'
import type { PropsWithChildren } from 'react'

export interface BodyProps {}

export const Body = ({ children }: PropsWithChildren<BodyProps>) => (
  <Center as="main" w="full">
    {children}
  </Center>
)
