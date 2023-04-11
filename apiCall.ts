import fetch, { type RequestInit } from 'node-fetch'

import { objectToUrlSearchParameters } from './utilities.js'

export interface Configuration {
  /**
   * Commonly the Self-Service Portal PLUS '-api'
   * ex. https://myavanti.ca/avtesting-api
   */
  base_api_url: string

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
      device_id: 'node-avanti-api-' + Date.now()
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
      getParameters?: Record<string, string | number | boolean>
    }
  | {
      method: 'post'
      bodyParameters?: object
    }

/**
 * Requests an API endpoint excluded from the included functions.
 * @param apiEndpoint ex. '/v1/Employees'
 * @param apiOptions 
 * @returns 
 */
export async function callApi(
  apiEndpoint: string,
  apiOptions: ApiOptions
): Promise<unknown> {
  let access_token = _accessToken?.access_token

  if (
    !access_token ||
    _accessTokenTimeMillis + _accessToken.expires_in <= Date.now()
  ) {
    const accessTokenResponse = await refreshAccessToken()
    access_token = accessTokenResponse.access_token
  }

  let requestUrl = _apiConfiguration.base_api_url + apiEndpoint

  if (apiOptions.method === 'get' && apiOptions.getParameters) {
    requestUrl += '?' + objectToUrlSearchParameters(apiOptions.getParameters)
  }

  const fetchOptions: RequestInit = {
    method: apiOptions.method,
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  }

  if (apiOptions.method === 'post' && apiOptions.bodyParameters) {
    fetchOptions.body = JSON.stringify(apiOptions.bodyParameters)
    fetchOptions.headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(requestUrl, fetchOptions)

  return await response.json()
}
