import { Center } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export interface BodyProps {}

export const Body = ({ children }: PropsWithChildren<BodyProps>) => (
  <Center w="full" flexGrow={1} >
    {children}
  </Center>
)
