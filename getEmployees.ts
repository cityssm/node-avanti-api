import fetch from 'node-fetch'

import type { ApiRequestCredentials } from './types'

export interface GetEmployees_Request {
  skip?: number
  take?: number
  empNoReference?: string
  search?: string
  total?: boolean
  active?: 0 | 1 | 2
  sortOrder?: 0 | 1 | 2
  sortDirection?: 0 | 1
  takeOption?: 0 | 1
  locations?: string[]
  employmentStatus?: string[]
  positions?: string[]
  sortDefinitions?: {
    field?: string
    dir?: string
  }[]
}

export interface GetEmployees_Response {
  employees?: Employee[]
  total?: number
  index?: number
}

export interface Employee {
  empNo?: string
  givenName?: string
  surname?: string
  preferredName?: string
  initial?: string
  positionName?: string
  positionNameFr?: string
  photoRevision?: number
  active: boolean
  email?: string
}

export async function getEmployees(
  parameters: GetEmployees_Request,
  credentials: ApiRequestCredentials
): Promise<GetEmployees_Response> {
  const response = await fetch(credentials.base_api_url + '/v1/Employees', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${credentials.access_token}`
    },
    body: JSON.stringify(parameters)
  })

  return (await response.json()) as GetEmployees_Response
}

export default getEmployees
