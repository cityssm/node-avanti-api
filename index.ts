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
  readonly #apiConfiguration: AvantiApiConfiguration

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
        device_id: `node-avanti-api-${Date.now().toString()}`
      },
      this.#apiConfiguration
    )

    const request = objectToUrlSearchParameters(
      requestObject as unknown as Record<string, string>
    )

    const response = await fetch(
      `${this.#apiConfiguration.base_api_url}/connect/token`,
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
   * @param {string} apiEndpoint - ex. '/v1/Employees'
   * @param {AvantiApiOptions} apiOptions - API Options
   * @returns {Promise<AvantiApiResponse<unknown>>} API Response
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
    let parsingError: Error | undefined

    try {
      const json = (await response.json()) ?? {}

      if (
        typeof json === 'object' &&
        (Object.hasOwn(json as object, 'status') ||
          Object.hasOwn(json as object, 'instance'))
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
   * List Employees: /v1/Employees
   * @param {GetEmployeesRequest} parameters - Request parameters
   * @returns {Promise<AvantiApiResponse<GetEmployeesResponse>>} See https://avanti.stoplight.io/docs/avanti-api/62932b8f232fb-list-employees
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
   * Get Employee Job Data: /v1/EmployeeJobData
   * @param {string} employeeNumber - Employee number
   * @returns {Promise<AvantiApiResponse<GetEmployeeJobDataResponse>>} See https://avanti.stoplight.io/docs/avanti-api/a44b4af6f1abd-get-employee-job-data
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
   * Get Employee Personal Info: /v1/PersonalInfo
   * @param {string} employeeNumber - Employee number
   * @returns {Promise<AvantiApiResponse<GetEmployeePersonalInfoResponse>>} See https://avanti.stoplight.io/docs/avanti-api/f851b988b5cf6-get-employee-personal-info
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
   * List Time Entries: /v1/TimeManagement/{viewId}/{templateId}
   * @param {string} viewId - View Id
   * @param {string} templateId - Template Id
   * @param {GetTimeEntriesRequest} parameters - Request parameters
   * @returns {Promise<AvantiApiResponse<GetTimeEntriesTimeEntry[]>>} See https://avanti.stoplight.io/docs/avanti-api/4952dd2917595-list-time-entries
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
   * List Time Entry Templates: /v1/TimeManagement/Templates
   * @param {GetTimeEntryTemplatesRequest} parameters - Request parameters
   * @returns {Promise<AvantiApiResponse<GetTimeEntryTemplatesTimeEntryTemplate[]>>} See https://avanti.stoplight.io/docs/avanti-api/faa0ddb0eb18d-list-time-entry-templates
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
   * Get Report Data: /v1/Reporter/{reportId}
   * @param {string} reportId - The ID of the report you would like to get the data for.
   * @returns {Promise<AvantiApiResponse<object[]>>} See https://avanti.stoplight.io/docs/avanti-api/ed0485a9c98bb-get-report-data
   */
  async getReport(reportId: string): Promise<AvantiApiResponse<object[]>> {
    return (await this.callApi(`/v1/Reporter/${reportId}`, {
      method: 'get'
    })) as AvantiApiResponse<object[]>
  }
}

export * as lookups from './lookups.js'

export type * as types from './types.js'
