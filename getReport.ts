import { callApi, type ApiResponse } from './apiCall.js'

/**
 * Endpoint: /v1/Reporter/{reportId}
 * @param reportId The ID of the report you would like to get the data for.
 * @returns
 */
export async function getReport(
  reportId: string
): Promise<ApiResponse<object[]>> {
  return (await callApi(`/v1/Reporter/${reportId}`, {
    method: 'get'
  })) as ApiResponse<object[]>
}
