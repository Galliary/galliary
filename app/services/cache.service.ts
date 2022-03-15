import Redis from 'ioredis'

export const CacheTimeInSeconds = {
  VeryShort: 60, // 1 minute
  Short: 300, // 5 minutes
  Medium: 1800, // 30 minutes
  Long: 3600, // 1 hour
  VeryLong: 86400, // 1 day
}

export class CacheService {
  public static redis = new Redis(process.env.REDIS_URL)

  private static _localCache = new Map<string, any>()
  private static _hasRedis = false // Boolean(process.env.REDIS_URL)

  private static _toString(item: Record<string, any>): string {
    return JSON.stringify(item)
  }

  private static _toObject(stringified: string): Record<string, any> {
    return JSON.parse(stringified)
  }

  public static async get<T>(
    id: string | Record<string, any>,
  ): Promise<T | undefined> {
    const stringId = typeof id === 'string' ? id : JSON.stringify(id)

    console.log('GET', { has: CacheService._hasRedis, id: stringId })

    if (CacheService._hasRedis) {
      const stringified = await this.redis.get(stringId)
      if (stringified) {
        return CacheService._toObject(stringified) as T
      }
    } else {
      const stringified = CacheService._localCache.get(stringId)
      if (stringified) {
        return CacheService._toObject(stringified) as T
      }
    }
  }

  public static async set<T>(
    id: string | Record<string, any>,
    item: T,
    expiryInSeconds: number = CacheTimeInSeconds.Short,
  ): Promise<void> {
    const stringId = typeof id === 'string' ? id : JSON.stringify(id)

    console.log('SET', {
      has: CacheService._hasRedis,
      id: stringId,
      EX: expiryInSeconds,
    })

    if (CacheService._hasRedis) {
      await this.redis.set(
        stringId,
        CacheService._toString(item),
        'EX',
        expiryInSeconds,
      )
    } else {
      CacheService._localCache.set(stringId, CacheService._toString(item))
    }
  }

  public static async cached<T>(
    id: string | Record<string, any>,
    fetcher: () => Promise<T>,
    cacheTimeInSeconds: number = CacheTimeInSeconds.Short,
  ): Promise<T> {
    const cached = await this.get<T>(id)
    if (cached) {
      return cached
    }

    const data = await fetcher()

    await this.set(id, data, cacheTimeInSeconds)

    return data
  }
}
