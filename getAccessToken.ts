import fetch from 'node-fetch'

import type { AccessTokenResponse, Configuration } from './types'
import { BasicObject, objectToUrlSearchParameters } from './utilities.js'

interface GetAccessToken_Request extends Configuration {
  grant_type: 'password' | string
  device_id: string
}

export async function getAccessToken(
  parameters: Configuration
): Promise<AccessTokenResponse> {
  const requestObject: GetAccessToken_Request = Object.assign(
    {
      grant_type: 'password',
      device_id: 'node-avanti-api-' + Date.now()
    },
    parameters
  )

  const request = objectToUrlSearchParameters(
    requestObject as unknown as BasicObject
  )

  const response = await fetch(parameters.base_api_url + '/connect/token', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: request
  })

  return (await response.json()) as AccessTokenResponse
}

export default getAccessToken
