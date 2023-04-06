import fetch from 'node-fetch'

import { objectToUrlSearchParameters } from './utilities.js'

import type { ApiRequestCredentials } from './types'

export interface GetTimeEntryTemplates_Request {
  empNo?: string
  viewId?: string
}

export interface GetTimeEntryTemplates_TimeEntryTemplate {
  templateId?: string
  name?: string
  nameFr?: string
  priority: number
  source: 0 | 1 | 2 | 3 | 4 | 5
  copyUnits: boolean
  doNotSpanDays: boolean
  fields?: {
    name?: string
    index: number
    key?: string
    isDetail: boolean
    isVisible: boolean
    isReadOnly: boolean
    isRequired: boolean
    sortOrder: number
    defaultValue: unknown
    filters?: {
      codes?: string
      value: unknown
    }[]
    header?: string
    headerFr?: string
    customHeader?: string
    customHeaderFr?: string
    customSetting?: string
    isDateField: boolean
    validation?: {
      validation?: string
      validationMessage?: string
      validationMessageFr?: string
    }[]
  }[]
  filters?: {
    table?: string
    id: number
    description?: string
    letter?: string
    fieldName?: string
    condition: number
    value?: string
    valueType: number
    conjunction: 0 | 1
    openingBrackets: number
    closingBrackets: number
  }[]
  criteria?: {
    table?: string
    id: number
    description?: string
    letter?: string
    fieldName?: string
    condition: number
    value?: string
    valueType: number
    conjunction: number
    openingBrackets: number
    closingBrackets: number
  }[]
  validation?: {
    expression?: string
    type: 0 | 1 | 2 | 3
    onLoad: boolean
    message?: string
    messageFr?: string
  }[]
  userGroups?: string[]
  payGroupEntitlementValidation?: object
  entitlementThreshold?: object
  allowInvalidGlAccount: boolean
  showEntitlements: boolean
  dateExpression?: string
  calendarColor: 0 | 1 | 2 | 3 | 4
  calendarMonthExpression?: string
  calendarMonthDescExpression?: string
  calendarWeekExpression?: string
  calendarWeekDescExpression?: string
  calendarDayExpression?: string
  calendarDayDescExpression?: string
  allowPooling: boolean
  filterGlSegments: boolean
  glSegmentFields?: {
    name?: string
    index: number
    key?: string
    isDetail: boolean
    isVisible: boolean
    isReadOnly: boolean
    isRequired: boolean
    sortOrder: number
    defaultValue?: unknown
    filters?: {
      codes?: string
      value: unknown
    }[]
    header?: string
    headerFr?: string
    customHeader?: string
    customHeaderFr?: string
    customSetting?: string
    isDateField: boolean
    validation?: {
      validation?: string
      validationMessage?: string
      validationMessageFr?: string
    }[]
  }[]
}

export async function getTimeEntryTemplates(
  parameters: GetTimeEntryTemplates_Request,
  credentials: ApiRequestCredentials
): Promise<GetTimeEntryTemplates_TimeEntryTemplate[]> {
  const urlParameters = objectToUrlSearchParameters(
    parameters as Record<string, string>
  )

  const requestUrl = `${
    credentials.base_api_url
  }/v1/TimeManagement/Templates?${urlParameters.toString()}`

  const response = await fetch(requestUrl, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${credentials.access_token}`
    }
  })

  return (await response.json()) as GetTimeEntryTemplates_TimeEntryTemplate[]
}

export default getTimeEntryTemplates
