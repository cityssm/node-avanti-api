import fetch from 'node-fetch'

import type { ApiRequestCredentials } from './types'

export async function getReport(
  reportId: string,
  credentials: ApiRequestCredentials
): Promise<object[]> {
  const response = await fetch(
    credentials.base_api_url + '/v1/Reporter/' + reportId,
    {
      method: 'get',
      headers: {
        Authorization: `Bearer ${credentials.access_token}`,
        'Content-Type': 'application/json'
      }
    }
  )

  return (await response.json()) as object[]
}

export default getReport
