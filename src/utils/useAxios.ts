import axios from 'axios'
import { ValidationError } from 'class-validator'
import nookies from 'nookies'

import { cookieKeys } from './consts/cookieKeys'
import { myNotifications } from './mantine/myNotifications'
import { myEnvs } from './myEnvs'

export const useAxios = (showErrorMessage = true) => {
  const localAxios = axios.create()
  localAxios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

  localAxios.interceptors.request.use(async (config) => {
    const userStr = nookies.get(null)[cookieKeys.user]

    if (userStr && config.headers)
      config.headers['authorization'] = JSON.parse(userStr).token
    return config
  })

  localAxios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // unauthenticated -> go to "/"
      // if (error?.response?.status === 401 && window) {
      //   window.location.href = urls.pages.index
      //   return
      // }

      if (!showErrorMessage) return Promise.reject(error)

      if (
        axios.isAxiosError<{ errors: ValidationError[]; message: string }>(
          error
        )
      ) {
        const constraints = error.response?.data?.errors?.[0].constraints
        if (constraints) {
          const [key, value] = Object.entries(constraints)[0]

          myNotifications.error(value)

          return Promise.reject(error)
        }

        const isIphone = navigator.userAgent.includes('iPhone')

        if (!myEnvs.isProduction && isIphone) {
          // debugging locally on iPhone
          console.log('do nothing')
        } else {
          myNotifications.error(error.response?.data.message ?? error.message)
        }
      }

      return Promise.reject(error)
    }
  )
  return localAxios
}
