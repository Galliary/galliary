import { Center } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

export interface BodyProps {}

export const Body = ({ children }: PropsWithChildren<BodyProps>) => (
  <Center w="full" pb={12}>
    {children}
  </Center>
)
