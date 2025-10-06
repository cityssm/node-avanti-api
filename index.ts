import Debug from 'debug'

import { DEBUG_NAMESPACE } from './debug.config.js'
import type {
  AccessTokenResponse,
  AvantiApiConfiguration,
  AvantiApiEndpoint,
  AvantiApiError,
  AvantiApiOptions,
  AvantiApiResponse,
  GetEmployeeEarningCodesEarningCode,
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

const debug = Debug(`${DEBUG_NAMESPACE}:index`)

export const _defaultLatestASSP = false

export class AvantiApi {
  readonly #accessTokenUrl: string
  readonly #apiConfiguration: AvantiApiConfiguration

  #accessToken: AccessTokenResponse | undefined
  #accessTokenTimeMillis = 0

  constructor(configuration: AvantiApiConfiguration) {
    this.#apiConfiguration = configuration

    this.#accessTokenUrl =
      (this.#apiConfiguration.latestASSP ?? _defaultLatestASSP)
        ? 'https://auth.myavanti.ca/connect/token'
        : `https://myavanti.ca/${this.#apiConfiguration.tenant}-api/connect/token`
  }

  #getEndpointUrl(apiEndpoint: AvantiApiEndpoint): string {
    return (this.#apiConfiguration.latestASSP ?? _defaultLatestASSP)
      ? `https://${this.#apiConfiguration.tenant}.myavanti.ca/api${apiEndpoint}`
      : `https://myavanti.ca/${this.#apiConfiguration.tenant}-api${apiEndpoint}`
  }

  async #refreshAccessToken(): Promise<AccessTokenResponse> {
    this.#accessTokenTimeMillis = Date.now()

    const requestObject = {
      device_id:
        this.#apiConfiguration.device_id ??
        `node-avanti-api-${Date.now().toString()}`,
      grant_type: 'password',

      client_id: this.#apiConfiguration.client_id,
      client_secret: this.#apiConfiguration.client_secret,
      username: this.#apiConfiguration.username,
      password: this.#apiConfiguration.password,
      company: this.#apiConfiguration.company
    }

    const request = objectToUrlSearchParameters(
      requestObject as unknown as Record<string, string>
    )

    debug(`Access token request: ${this.#accessTokenUrl}`)

    const response = await fetch(this.#accessTokenUrl, {
      method: 'post',

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-tenant': this.#apiConfiguration.tenant
      },

      body: request
    })

    this.#accessToken = (await response.json()) as AccessTokenResponse

    if ((this.#accessToken?.access_token ?? '') === '') {
      debug('Error retrieving access token.')
    }

    debug(`Access Token: ${this.#accessToken.access_token}`)

    return this.#accessToken
  }

  /**
   * Requests an API endpoint excluded from the included functions.
   * @param apiEndpoint - ex. '/v1/Employees'
   * @param apiOptions - API Options
   * @returns API Response
   */
  async callApi<T>(
    apiEndpoint: AvantiApiEndpoint,
    apiOptions: AvantiApiOptions
  ): Promise<AvantiApiResponse<T>> {
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

    let requestUrl = this.#getEndpointUrl(apiEndpoint)

    debug(`API request: ${requestUrl}`)

    if (apiOptions.method === 'get') {
      requestUrl += `?${objectToUrlSearchParameters(
        apiOptions.getParameters ?? {}
      ).toString()}`
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

    // eslint-disable-next-line @typescript-eslint/init-declarations
    let parsingError: Error | undefined

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const json = (await response.json()) ?? {}

      if (
        typeof json === 'object' &&
        (Object.hasOwn(json as object, 'status') ||
          Object.hasOwn(json as object, 'instance'))
      ) {
        return {
          success: false,
          error: json as AvantiApiError
        }
      }

      return {
        success: true,
        response: json
      }
    } catch (error) {
      debug(response)
      parsingError = error as Error
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
   * List Employees:
   * /v1/Employees
   * @param parameters - Request parameters
   * @returns See https://avanti.stoplight.io/docs/avanti-api/62932b8f232fb-list-employees
   */
  async getEmployees(
    parameters: GetEmployeesRequest
  ): Promise<AvantiApiResponse<GetEmployeesResponse>> {
    return await this.callApi('/v1/Employees', {
      bodyParameters: parameters,
      method: 'post'
    })
  }

  /**
   * List Employee Earning Codes:
   * /v1/EmployeeEarningCodes
   * @param employeeNumber - Employee number
   * @returns See https://avanti.stoplight.io/docs/avanti-api/204d3078d2230-list-employee-earning-codes
   */
  async getEmployeeEarningCodes(
    employeeNumber?: string
  ): Promise<AvantiApiResponse<GetEmployeeEarningCodesEarningCode[]>> {
    return await this.callApi('/v1/EmployeeEarningCodes', {
      getParameters: {
        empNo: employeeNumber
      },
      method: 'get'
    })
  }

  /**
   * Get Employee Job Data:
   * /v1/EmployeeJobData
   * @param employeeNumber - Employee number
   * @returns See https://avanti.stoplight.io/docs/avanti-api/a44b4af6f1abd-get-employee-job-data
   */
  async getEmployeeJobData(
    employeeNumber: string
  ): Promise<AvantiApiResponse<GetEmployeeJobDataResponse>> {
    return await this.callApi('/v1/EmployeeJobData', {
      getParameters: {
        empNo: employeeNumber
      },
      method: 'get'
    })
  }

  /**
   * Get Employee Personal Info:
   * /v1/PersonalInfo
   * @param employeeNumber - Employee number
   * @returns See https://avanti.stoplight.io/docs/avanti-api/f851b988b5cf6-get-employee-personal-info
   */
  async getEmployeePersonalInfo(
    employeeNumber: string
  ): Promise<AvantiApiResponse<GetEmployeePersonalInfoResponse>> {
    return await this.callApi('/v1/PersonalInfo', {
      getParameters: {
        empNo: employeeNumber
      },
      method: 'get'
    })
  }

  /**
   * List Time Entries:
   * /v1/TimeManagement/{viewId}/{templateId}
   * @param viewId - View Id
   * @param templateId - Template Id
   * @param parameters - Request parameters
   * @returns See https://avanti.stoplight.io/docs/avanti-api/4952dd2917595-list-time-entries
   */
  async getTimeEntries(
    viewId: string,
    templateId: string,
    parameters: GetTimeEntriesRequest
  ): Promise<AvantiApiResponse<GetTimeEntriesTimeEntry[]>> {
    return await this.callApi(`/v1/TimeManagement/${viewId}/${templateId}`, {
      getParameters: parameters,
      method: 'get'
    })
  }

  /**
   * List Time Entry Templates:
   * /v1/TimeManagement/Templates
   * @param parameters - Request parameters
   * @returns See https://avanti.stoplight.io/docs/avanti-api/faa0ddb0eb18d-list-time-entry-templates
   */
  async getTimeEntryTemplates(
    parameters: GetTimeEntryTemplatesRequest
  ): Promise<AvantiApiResponse<GetTimeEntryTemplatesTimeEntryTemplate[]>> {
    return await this.callApi('/v1/TimeManagement/Templates', {
      getParameters: parameters,
      method: 'get'
    })
  }

  /**
   * Get Report Data:
   * /v1/Reporter/{reportId}
   * @param reportId - The ID of the report you would like to get the data for.
   * @returns See https://avanti.stoplight.io/docs/avanti-api/ed0485a9c98bb-get-report-data
   */
  async getReport(reportId: string): Promise<AvantiApiResponse<object[]>> {
    return await this.callApi(`/v1/Reporter/${reportId}`, {
      method: 'get'
    })
  }
}

export * as lookups from './lookups.js'

export type * as types from './types.js'
