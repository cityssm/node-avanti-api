/* eslint-disable @typescript-eslint/indent */

import 'core-js/actual/object/index.js'

import fetch, { type RequestInit } from 'node-fetch'

import { objectToUrlSearchParameters } from './utilities.js'

export interface Configuration {
  /**
   * Commonly the Self-Service Portal PLUS '-api'
   * ex. https://myavanti.ca/avtesting-api
   */
  base_api_url:
    | `https://myavanti.ca/${string}-api`
    | `https://stoplight.io/mocks/avanti/avanti-api/${string}`

  /**
   * Client ID
   */
  client_id: string

  /**
   * Client password
   */
  client_secret: string

  /**
   * Employee user name
   */
  username: string

  /**
   * Employee password
   */
  password: string

  /**
   * Company database name
   */
  company: string

  device_id?: string
}

interface AccessTokenResponse {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
  auth_state: number
  company: string
}

let _apiConfiguration: Configuration

let _accessTokenTimeMillis = 0
let _accessToken: AccessTokenResponse

/**
 *
 * @param config The necessary credentials to use the API
 */
export function setConfiguration(config: Configuration): void {
  _apiConfiguration = config
}

async function refreshAccessToken(): Promise<AccessTokenResponse> {
  _accessTokenTimeMillis = Date.now()

  const requestObject = Object.assign(
    {
      grant_type: 'password',
      device_id: 'node-avanti-api-' + Date.now().toString()
    },
    _apiConfiguration
  )

  const request = objectToUrlSearchParameters(
    requestObject as unknown as Record<string, string>
  )

  const response = await fetch(
    _apiConfiguration.base_api_url + '/connect/token',
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: request
    }
  )

  _accessToken = (await response.json()) as AccessTokenResponse

  return _accessToken
}

type ApiOptions =
  | {
      method: 'get'
      getParameters?: Record<string, string | number | boolean | undefined>
    }
  | {
      method: 'post'
      bodyParameters?: object
    }

export type ApiResponse<T> =
  | {
      success: true
      response: T
    }
  | {
      success: false
      error: {
        type?: string
        title?: string
        status?: number
        detail?: string
        instance?: string
        error?: Error
      }
    }

/**
 * Requests an API endpoint excluded from the included functions.
 * @param apiEndpoint ex. '/v1/Employees'
 * @param apiOptions
 * @returns
 */
export async function callApi(
  apiEndpoint: `/v1/${string}`,
  apiOptions: ApiOptions
): Promise<ApiResponse<unknown>> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let access_token = _accessToken?.access_token ?? ''

  if (
    access_token === '' ||
    _accessTokenTimeMillis + _accessToken.expires_in <= Date.now()
  ) {
    const accessTokenResponse = await refreshAccessToken()
    access_token = accessTokenResponse.access_token
  }

  let requestUrl = _apiConfiguration.base_api_url + apiEndpoint

  if (apiOptions.method === 'get') {
    requestUrl +=
      '?' +
      objectToUrlSearchParameters(apiOptions.getParameters ?? {}).toString()
  }

  const fetchOptions: RequestInit = {
    method: apiOptions.method,
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  }

  if (apiOptions.method === 'post') {
    fetchOptions.body = JSON.stringify(apiOptions.bodyParameters)
    ;(fetchOptions.headers as HeadersInit)['Content-Type'] = 'application/json'
  }

  const response = await fetch(requestUrl, fetchOptions)
  let parsingError: Error | undefined

  try {
    const json = (await response.json()) ?? {}

    if (
      typeof json === 'object' &&
      (Object.hasOwn(json, 'status') || Object.hasOwn(json, 'instance'))
    ) {
      return {
        success: false,
        error: json
      }
    }

    return {
      success: true,
      response: json
    }
  } catch (error) {
    parsingError = error
  }

  return {
    success: false,
    error: {
      title: 'callApi() error',
      status: 600,
      detail: parsingError === undefined ? undefined : parsingError.name,
      error: parsingError,
      instance: apiEndpoint
    }
  }
}
