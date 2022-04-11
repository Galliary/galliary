import * as React from 'react'
import { DefaultCtx, PromiseReturnType, SessionContext } from 'blitz'
import { User } from 'db'
import { UseDisclosureReturn } from '@chakra-ui/react'
import {
  RedirectAuthenticatedTo,
  RedirectAuthenticatedToFn,
  RouteUrlObject,
} from 'next'
import getCurrentUser from 'app/data/queries/users/getCurrentUser'
import { Permissions } from 'app/utils/permissions'
import {
  AppPropsType,
  NextComponentType,
  NextPageContext,
} from 'next/dist/shared/lib/utils'
import { Router } from 'next/router'

export type Maybe<T> = T | null | undefined
export type NotUndefined<T> = T extends undefined ? never : T
export type PropsForModal<Props = Record<string, unknown>> = Props &
  UseDisclosureReturn

declare module 'blitz' {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }

  export interface Session {
    PublicData: {
      userId: User['id']
      permissions: number
    }
  }

  export type GlobalPageProps = {
    currentUser: PromiseReturnType<typeof getCurrentUser>
  }

  export type NextPage<P = {}, IP = P> = NextComponentType<
    NextPageContext,
    IP,
    P
  > & {
    getLayout?: (component: JSX.Element) => JSX.Element
    getPermissions?: () => Permissions[]
    authenticate?: boolean | { redirectTo?: string | RouteUrlObject }
    suppressFirstRenderFlicker?: boolean
    redirectAuthenticatedTo?:
      | RedirectAuthenticatedTo
      | RedirectAuthenticatedToFn
  }

  export type BlitzPage<P = {}, IP = P> = NextPage<P & GlobalPageProps, IP>

  export type AppProps<P = {}> = AppPropsType<Router, P> & {
    Component: BlitzPage
  }
}

// svg cringe
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
