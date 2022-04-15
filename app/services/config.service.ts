import { UserConnectionType } from 'db'
import { BlitzPassportStrategy } from 'blitz'
import { ENABLED_AUTH_STRATEGIES } from 'app/constants'
import { BlitzApiRequest, BlitzApiResponse } from 'next'
import { GoogleStrategy } from 'app/auth/strategies/google'
import { DiscordStrategy } from 'app/auth/strategies/discord'
import { TwitterStrategy } from 'app/auth/strategies/twitter'
import { LinkedInStrategy } from 'app/auth/strategies/linkedin'
import { StrategyType, strategyWithApi } from 'app/auth/utils/strategyWithApi'

export const StrategyMap = {
  [UserConnectionType.GOOGLE]: GoogleStrategy,
  [UserConnectionType.DISCORD]: DiscordStrategy,
  [UserConnectionType.TWITTER]: TwitterStrategy,
  [UserConnectionType.LINKEDIN]: LinkedInStrategy,
} as const

type IsDefinedByBoolean<T> = T extends true ? string : string | undefined

export class ConfigService {
  static get<T extends true | false>(
    key: keyof NodeJS.ProcessEnv,
    throwIfEmpty?: T,
  ): IsDefinedByBoolean<T> {
    const value = process.env[key]
    if (throwIfEmpty && (value === undefined || value === null)) {
      throw new Error(`'${key}' is not defined in the env-vars.`)
    }
    return value as IsDefinedByBoolean<T>
  }

  static getStrategyConfig(
    type: UserConnectionType,
    strategyType: StrategyType,
  ) {
    if (type === UserConnectionType.EMAIL) {
      throw Error('Not implemented as strategy.')
    }

    return {
      clientId: this.get(`${type}_CLIENT_ID`, true),
      clientSecret: this.get(`${type}_CLIENT_SECRET`, true),
      callbackUrl:
        strategyType === StrategyType.Create
          ? this.get(`${type}_CALLBACK_URL`, true)
          : this.get(`${type}_CONNECT_CALLBACK_URL`, true),
    }
  }

  static getStrategies(
    req: BlitzApiRequest,
    res: BlitzApiResponse,
    strategyType: StrategyType,
  ): BlitzPassportStrategy[] {
    return ENABLED_AUTH_STRATEGIES.map((type) => ({
      strategy: strategyWithApi(req, res, StrategyMap[type], strategyType),
    }))
  }
}
