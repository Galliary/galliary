import { BlitzApiRequest, BlitzApiResponse } from 'next'
import { Strategy } from 'passport'

export enum StrategyType {
  Connect,
  Create,
}

export const strategyWithApi = (
  req: BlitzApiRequest,
  res: BlitzApiResponse,
  strategy: (
    req: BlitzApiRequest,
    res: BlitzApiResponse,
    type: StrategyType,
  ) => Strategy,
  type: StrategyType,
): Strategy => {
  return strategy(req, res, type)
}
