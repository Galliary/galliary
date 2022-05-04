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
}
