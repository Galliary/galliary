import * as React from "react";
import { UseDisclosureReturn } from "@chakra-ui/react";
import { NextComponentType, NextPageContext } from "next/dist/shared/lib/utils";
import { CurrentUserQueryHookResult } from "generated/graphql";

export type Maybe<T> = T | null | undefined
export type NotUndefined<T> = T extends undefined ? never : T
export type PropsForModal<Props = Record<string, unknown>> = Props &
  UseDisclosureReturn

export interface GlobalPageProps {
  authToken: string | null
  currentUser: NotUndefined<CurrentUserQueryHookResult['data']>['user'] | null
}

declare module 'next' {
  export type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P & GlobalPageProps>
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
