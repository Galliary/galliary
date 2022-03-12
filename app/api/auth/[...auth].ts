import { BlitzApiHandler, getSession, passportAuth } from 'blitz'
import { StrategyType } from 'app/auth/utils/strategyWithApi'
import { ConfigService } from 'app/services/config.service'

const AuthApi: BlitzApiHandler = async (req, res) => {
  const session = await getSession(req, res)

  if (session && session.userId) {
    res.redirect(`/users/${session.userId}?error=already-logged-in`)
    return
  }

  return passportAuth({
    successRedirectUrl: '/',
    errorRedirectUrl: '/',
    strategies: ConfigService.getStrategies(req, res, StrategyType.Create),
  })(req, res)
}

export default AuthApi
