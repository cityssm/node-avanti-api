import 'core-js/actual/object/index.js'

import fetch, { type RequestInit } from 'node-fetch'

import type {
  AccessTokenResponse,
  AvantiApiConfiguration,
  AvantiApiOptions,
  AvantiApiResponse,
  GetEmployeeJobDataResponse,
  GetEmployeePersonalInfoResponse,
  GetEmployeesRequest,
  GetEmployeesResponse,
  GetTimeEntriesRequest,
  GetTimeEntriesTimeEntry,
  GetTimeEntryTemplatesRequest,
  GetTimeEntryTemplatesTimeEntryTemplate
} from './types.js'
import { objectToUrlSearchParameters } from './utilities.js'

export class AvantiApi {
  #apiConfiguration: AvantiApiConfiguration

  #accessTokenTimeMillis = 0
  #accessToken: AccessTokenResponse | undefined

  constructor(configuration: AvantiApiConfiguration) {
    this.#apiConfiguration = configuration
  }

  async #refreshAccessToken(): Promise<AccessTokenResponse> {
    this.#accessTokenTimeMillis = Date.now()

    const requestObject = Object.assign(
      {
        grant_type: 'password',
        device_id: 'node-avanti-api-' + Date.now().toString()
      },
      this.#apiConfiguration
    )

    const request = objectToUrlSearchParameters(
      requestObject as unknown as Record<string, string>
    )

    const response = await fetch(
      this.#apiConfiguration.base_api_url + '/connect/token',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: request
      }
    )

    this.#accessToken = (await response.json()) as AccessTokenResponse

    return this.#accessToken
  }

  /**
   * Requests an API endpoint excluded from the included functions.
   * @param apiEndpoint ex. '/v1/Employees'
   * @param apiOptions
   * @returns
   */
  async callApi(
    apiEndpoint: `/v1/${string}`,
    apiOptions: AvantiApiOptions
  ): Promise<AvantiApiResponse<unknown>> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let access_token = this.#accessToken?.access_token ?? ''

    if (
      access_token === '' ||
      this.#accessTokenTimeMillis + (this.#accessToken?.expires_in ?? 0) <=
        Date.now()
    ) {
      const accessTokenResponse = await this.#refreshAccessToken()
      access_token = accessTokenResponse.access_token
    }

    let requestUrl = this.#apiConfiguration.base_api_url + apiEndpoint

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
      ;(fetchOptions.headers as HeadersInit)['Content-Type'] =
        'application/json'
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

  /**
   * Endpoint: /v1/Employees
   * @param parameters
   * @returns
   */
  async getEmployees(
    parameters: GetEmployeesRequest
  ): Promise<AvantiApiResponse<GetEmployeesResponse>> {
    return (await this.callApi('/v1/Employees', {
      method: 'post',
      bodyParameters: parameters
    })) as AvantiApiResponse<GetEmployeesResponse>
  }

  /**
   * Endpoint: /v1/EmployeeJobData
   * @param employeeNumber
   * @returns
   */
  async getEmployeeJobData(
    employeeNumber: string
  ): Promise<AvantiApiResponse<GetEmployeeJobDataResponse>> {
    return (await this.callApi('/v1/EmployeeJobData', {
      method: 'get',
      getParameters: {
        empNo: employeeNumber
      }
    })) as AvantiApiResponse<GetEmployeeJobDataResponse>
  }

  /**
   * Endpoint: /v1/PersonalInfo
   * @param employeeNumber
   * @returns
   */
  async getEmployeePersonalInfo(
    employeeNumber: string
  ): Promise<AvantiApiResponse<GetEmployeePersonalInfoResponse>> {
    return (await this.callApi('/v1/PersonalInfo', {
      method: 'get',
      getParameters: {
        empNo: employeeNumber
      }
    })) as AvantiApiResponse<GetEmployeePersonalInfoResponse>
  }

  /**
   * Endpoint: /v1/TimeManagement/{viewId}/{templateId}
   * @param viewId
   * @param templateId
   * @param parameters
   * @returns
   */
  async getTimeEntries(
    viewId: string,
    templateId: string,
    parameters: GetTimeEntriesRequest
  ): Promise<AvantiApiResponse<GetTimeEntriesTimeEntry[]>> {
    return (await this.callApi(`/v1/TimeManagement/${viewId}/${templateId}`, {
      method: 'get',
      getParameters: parameters
    })) as AvantiApiResponse<GetTimeEntriesTimeEntry[]>
  }

  /**
   * Endpoint: /v1/TimeManagement/Templates
   * @param parameters
   * @returns
   */
  async getTimeEntryTemplates(
    parameters: GetTimeEntryTemplatesRequest
  ): Promise<AvantiApiResponse<GetTimeEntryTemplatesTimeEntryTemplate[]>> {
    return (await this.callApi('/v1/TimeManagement/Templates', {
      method: 'get',
      getParameters: parameters
    })) as AvantiApiResponse<GetTimeEntryTemplatesTimeEntryTemplate[]>
  }

  /**
   * Endpoint: /v1/Reporter/{reportId}
   * @param reportId The ID of the report you would like to get the data for.
   * @returns
   */
  async getReport(reportId: string): Promise<AvantiApiResponse<object[]>> {
    return (await this.callApi(`/v1/Reporter/${reportId}`, {
      method: 'get'
    })) as AvantiApiResponse<object[]>
  }
}

export * as lookups from './lookups.js'
