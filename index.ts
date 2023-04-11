import type * as types from './types'

export { setConfiguration } from './apiCall.js'

import { callApi } from './apiCall.js'

export async function getEmployees(
  parameters: types.GetEmployees_Request
): Promise<types.GetEmployees_Response> {
  return await callApi('/v1/Employees', {
    method: 'post',
    bodyParameters: parameters
  })
}

export async function getTimeEntries(
  viewId: string,
  templateId: string,
  parameters: types.GetTimeEntries_Request
): Promise<types.GetTimeEntries_TimeEntry[]> {
  return (await callApi(`/v1/TimeManagement/${viewId}/${templateId}`, {
    method: 'get',
    getParameters: parameters
  })) as types.GetTimeEntries_TimeEntry[]
}

export async function getTimeEntryTemplates(
  parameters: types.GetTimeEntryTemplates_Request
): Promise<types.GetTimeEntryTemplates_TimeEntryTemplate[]> {
  return (await callApi('/v1/TimeManagement/Templates', {
    method: 'get',
    getParameters: parameters
  })) as types.GetTimeEntryTemplates_TimeEntryTemplate[]
}

export async function getReport(reportId: string): Promise<object[]> {
  return (await callApi(`/v1/Reporter/${reportId}`, {
    method: 'get'
  })) as object[]
}
