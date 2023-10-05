import { toStringOrThrowError } from './toStringOrThrowError'

export const myEnvs = {
  NEXT_PUBLIC_API_URL: toStringOrThrowError(process.env.NEXT_PUBLIC_API_URL),
  isProduction: process.env.NODE_ENV === 'production',
}
