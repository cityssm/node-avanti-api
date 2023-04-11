export interface Configuration {
  base_api_url: string
  client_id: string
  client_secret: string
  username: string
  password: string
  company: string
}

export interface AccessTokenResponse {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
  auth_state: number
  company: string
}

export interface ApiRequestCredentials {
  base_api_url: string
  access_token: string
}

// Get Employees

export interface GetEmployees_Request {
  skip?: number
  take?: number
  empNoReference?: string
  search?: string
  total?: boolean
  active?: 0 | 1 | 2
  sortOrder?: 0 | 1 | 2
  sortDirection?: 0 | 1
  takeOption?: 0 | 1
  locations?: string[]
  employmentStatus?: string[]
  positions?: string[]
  sortDefinitions?: {
    field?: string
    dir?: string
  }[]
}

export interface GetEmployees_Response {
  employees?: GetEmployees_Employee[]
  total?: number
  index?: number
}

export interface GetEmployees_Employee {
  empNo?: string
  givenName?: string
  surname?: string
  preferredName?: string
  initial?: string
  positionName?: string
  positionNameFr?: string
  photoRevision?: number
  active: boolean
  email?: string
}

// Get Time Entries

export interface GetTimeEntries_Request extends Record<string, string | number | boolean> {
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

// Get Time Entry Templates


export interface GetTimeEntryTemplates_Request extends Record<string, string>  {
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
