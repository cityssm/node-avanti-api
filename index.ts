import type { AccessTokenResponse, Configuration } from './types.js'

let _apiConfiguration: Configuration

let _accessTokenTimeMillis: number
let _accessToken: AccessTokenResponse

export function setConfiguration(config: Configuration): void {
  _apiConfiguration = config
}

import _getAccessToken from './getAccessToken.js'

async function getAccessToken(): Promise<AccessTokenResponse> {
  if (
    _accessToken === undefined ||
    _accessTokenTimeMillis + _accessToken.expires_in <= Date.now()
  ) {
    _accessTokenTimeMillis = Date.now()
    _accessToken = await _getAccessToken(_apiConfiguration)
  }

  return _accessToken
}

// Employees

import {
  getEmployees as _getEmployees,
  type GetEmployees_Request
} from './getEmployees.js'

export async function getEmployees(parameters: GetEmployees_Request) {
  const accessToken = await getAccessToken()
  return await _getEmployees(parameters, {
    base_api_url: _apiConfiguration.base_api_url,
    access_token: accessToken.access_token
  })
}

// Report

import { getReport as _getReport } from './getReport.js'

export async function getReport(reportId: string) {
  const accessToken = await getAccessToken()
  return await _getReport(reportId, {
    base_api_url: _apiConfiguration.base_api_url,
    access_token: accessToken.access_token
  })
}
