import { callApi } from './apiCall.js'

export async function getReport(reportId: string): Promise<object[]> {
  return (await callApi(`/v1/Reporter/${reportId}`, {
    method: 'get'
  })) as object[]
}
