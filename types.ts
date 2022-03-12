import * as React from 'react'
import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from 'blitz'
import { User, UserRole } from 'db'
import { UseDisclosureReturn } from '@chakra-ui/react'

export type Maybe<T> = T | null | undefined
export type NotUndefined<T> = T extends undefined ? never : T
export type PropsForModal<Props = Record<string, unknown>> = Props &
  UseDisclosureReturn

declare module 'blitz' {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<UserRole>
    PublicData: {
      userId: User['id']
      role: UserRole
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      fegaussianblur: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          in: string
          stddeviation: string
          result: string
        },
        HTMLElement
      >
      fecolormatrix: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          in: string
          mode: string
          values: string
          result: string
        },
        HTMLElement
      >
      fecomposite: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          in: string
          in2: string
          operator: string
        },
        HTMLElement
      >
    }
  }
}
