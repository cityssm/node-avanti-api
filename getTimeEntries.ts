import { callApi } from './apiCall.js'

export interface GetTimeEntries_Request
  extends Record<string, string | number | boolean> {
  before?: boolean
  date: string
  empNo: string
  endDate?: string
  id?: number
  skip?: number
  take?: number
}

export interface GetTimeEntries_TimeEntry {
  source: 0 | 1 | 2 | 3 | 4 | 5
  id: number
  empNo?: string
  date?: string
  originalDate?: string
  dates?: string
  unit?: number
  unitCode?: string
  unitCodeDescription?: string
  fromTime?: string
  toTime?: string
  originalFromTime?: string
  isApproved: boolean
  approvalLevel: number
  maxApprovalLevel: number
  approvedBy?: string
  approvedDate?: string
  positionCode?: string
  positionCodeDescription?: string
  comments?: string
  shiftId?: string
  shiftIdDescription?: string
  attendanceCode?: string
  attendanceCodeDescription?: string
  taskId?: string
  taskIdDescription?: string
  unionOverride?: string
  unionOverrideDescription?: string
  vacOverride?: string
  vacOverrideDescription?: string
  wcbOverride?: string
  wcbOverrideDescription?: string
  provEmployedOverride?: string
  provEmployedOverrideDescription?: string
  location?: string
  locationDescription?: string
  gl?: string
  glSegment: {
    no: number
    value?: string
    description?: string
  }[]
  documents?: {
    documentId: number
    name?: string
    contentType?: string
    typeId: number
    typeIdDescription?: string
    fileName?: string
    content?: string
    description?: string
    summary?: string
    createdBy?: string
    isDirty: boolean
    readOnly: boolean
    allowInsert: boolean
    allowModify: boolean
    allowDelete: boolean
    allowView: boolean
  }[]
  deletedDocuments?: number[]
  userApprovalLevel: number
  allowInsert: boolean
  allowModify: boolean
  allowDelete: boolean
  viewAmounts: boolean
  unitEnabled: boolean
  unitCodeEnabled: boolean
  fromTimeEnabled: boolean
  toTimeEnabled: boolean
  shiftIdEnabled: boolean
  details?: string
  isDirty: boolean
  isValid: boolean
  status: 0 | 1 | 2 | 3 | 4
  readOnly: boolean
  isProcessed: boolean
  processedBy?: string
  processedDate?: string
  inExceptionCode?: number
  recordSource: number
  punchRuleId?: string
  breakRuleId?: string
  rate?: number
  earnDeductCode?: string
  earnDeductCodeDescription?: string
  workOrder?: string
  gridCode?: string
  gridPercent?: number
  glSource?: number
  glType?: string
  glGroup?: string
  glGroupDescription?: string
  benGroup?: string
  isUnscheduled: boolean
  outExceptionCode?: number
  createdBy?: string
  createdDateTime?: string
  modifiedBy?: string
  modifiedDateTime?: string
  recordSourceId: number
  isBreakRuleApplied: boolean
  isOtherRuleApplied: boolean
  isInBatch: boolean
  rateLevel?: number
  otOption: boolean
  payPrimaryPosRate: boolean
  payCode?: string
  payCodeDescription?: string
  createdFromTimeCardId: number
  exceptionCodes: number
  exceptions?: string
  timeCardOverrides?: {
    apply: boolean
    type: 0 | 1
    ruleId?: string
    typeDescription?: string
    description?: string
  }[]
  timeCardEdits?: string
  modificationCodes: number
  scheduleFromTime?: number
  scheduleToTime?: number
  scheduleCode?: string
  scheduleUnits: number
  scheduleUnitCode?: string
  scheduled?: string
  isCancelled: boolean
  punchId?: string
  punchOut?: string
  punched?: string
  fromRawDataId: number
  toRawDataId: number
  fromRawDataIsBreak: boolean
  toRawDataIsBreak: boolean
  toRawEventTypeId: number
  fromRawEventTypeId: number
  scheduleId: number
  breakStart1?: number
  breakStart2?: number
  breakStart3?: number
  breakStart4?: number
  breakStart5?: number
  breakDuration1?: number
  breakDuration2?: number
  breakDuration3?: number
  breakDuration4?: number
  breakDuration5?: number
  timeSourceId: number
  batchNumber?: number
  week?: string
  earnType: number
  rateSource: number
  earningAmount: number
  deductionAmount: number
  benefitAmount: number
  payGroup?: string
  entryRejected: boolean
  leaveBenefitCode?: string
  leaveUnit: number
  leaveUnitCode?: string
  runNumber: number
  processedRunNumber: number
  isUpdated: boolean
  enteredBy?: string
  reduceSalary: boolean
  workGroupId?: string
  payEndingDate?: string
  availabilityType?: number
  availabilityTypeDescription?: string
  entrySourceId: number
  entrySourceType: number
  allDay: boolean
  allDayEnabled: boolean
  poolPickupRuleId?: string
  poolEntryId?: number
  poolCreatedBy?: string
  poolCreatedDate?: string
  poolIsCancelled: boolean
  poolExpiryDate?: string
  postSwapStatus?: string
  allowPostSwap: boolean
  poolRuleExists: boolean
  isPooled: boolean
  breaks?: string
}

/**
 * Endpoint: /v1/TimeManagement/{viewId}/{templateId}
 * @param viewId 
 * @param templateId 
 * @param parameters 
 * @returns 
 */
export async function getTimeEntries(
  viewId: string,
  templateId: string,
  parameters: GetTimeEntries_Request
): Promise<GetTimeEntries_TimeEntry[]> {
  return (await callApi(`/v1/TimeManagement/${viewId}/${templateId}`, {
    method: 'get',
    getParameters: parameters
  })) as GetTimeEntries_TimeEntry[]
}
