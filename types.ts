import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"
import { User, UserRole } from "db"

export type Maybe<T> = T | null | undefined

export enum SupportedLocales {
  English = "en-US",
}

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<UserRole>
    PublicData: {
      userId: User["id"]
    }
  }
}
