// SETUP

export {
  setConfiguration,
  callApi,
  type Configuration,
  type ApiResponse
} from './apiCall.js'

// ENDPOINTS

export { getEmployees, type GetEmployees_Request } from './getEmployees.js'

export { getEmployeeJobData } from './getEmployeeJobData.js'
export { getEmployeePersonalInfo } from './getEmployeePersonalInfo.js'

export {
  getTimeEntries,
  type GetTimeEntries_Request
} from './getTimeEntries.js'

export {
  getTimeEntryTemplates,
  type GetTimeEntryTemplates_Request
} from './getTimeEntryTemplates.js'

export { getReport } from './getReport.js'

// LOOKUPS

export * as lookups from './lookups.js'
