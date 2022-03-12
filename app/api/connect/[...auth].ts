import { BlitzApiHandler, getSession, passportAuth } from 'blitz'
import { StrategyType } from 'app/auth/utils/strategyWithApi'
import { ConfigService } from 'app/services/config.service'

const ConnectApi: BlitzApiHandler = async (req, res) => {
  const session = await getSession(req, res)

  if (!session.userId) {
    res.redirect('/?error=not-logged-in')
    return
  }

  return passportAuth({
    successRedirectUrl: `/users/${session.userId}`,
    errorRedirectUrl: `/users/${session.userId}?error=account-linking-error`,
    strategies: ConfigService.getStrategies(req, res, StrategyType.Connect),
  })(req, res)
}

export default ConnectApi
