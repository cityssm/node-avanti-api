// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/indent */

export interface AvantiApiConfiguration {
  /**
   * https://[tenant].myavanti.ca/
   */
  tenant: string

  latestASSP?: boolean

  /**
   * Client ID
   */
  client_id: string

  /**
   * Client password
   */
  client_secret: string

  /**
   * Employee user name
   */
  username: string

  /**
   * Employee password
   */
  password: string

  /**
   * Company database name
   */
  company: string

  device_id?: string
}

export type AvantiApiOptions =
  | {
      method: 'get'
      getParameters?: Record<string, string | number | boolean | undefined>
    }
  | {
      method: 'post'
      bodyParameters?: object
    }

export interface AvantiApiError {
  type?: string
  title?: string
  status?: number
  detail?: string
  instance?: string
  error?: Error
}

export type AvantiApiResponse<T> =
  | {
      success: true
      response: T
    }
  | {
      success: false
      error: AvantiApiError
    }

export interface AccessTokenResponse {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
  auth_state: number
  company: string
}

export type AvantiApiEndpoint = `/v${number}/${string}`

/*
 * Get Employees
 */

export interface GetEmployeesRequest {
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
  sortDefinitions?: Array<{
    field?: string
    dir?: string
  }>
}

export interface GetEmployeesResponse {
  employees?: GetEmployeesEmployee[]
  total?: number
  index?: number
}

export interface GetEmployeesEmployee {
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

export interface GetEmployeeEarningCodesEarningCode {
  text?: string
  value?: string
}

/*
 * Get Employee Job Data
 */

export interface GetEmployeeJobDataResponse {
  employeeJobInfo: {
    active: boolean
    location: string
    locationDescription?: string
    position: string
    positionName?: string
    employmentStatus: string
    employmentStatusDescription?: string
    jobStatus?: string
    jobStatusDescription?: string
    wcbGroup?: string
    wcbGroupDescription?: string
    unionCode?: string
    unionCodeDescription?: string
    workGroup?: string
    workGroupDescription?: string
    scheduleTemplate?: string
    scheduleTemplateDescription?: string
    reportsToPosition?: string
    reportsToEmployee?: string
    employeeNumber?: string
    employmentGroup?: string
    employmentGroupDescription?: string
    initialHireDate?: string
    lastHireDate?: string
    seniorityDate?: string
    overtimeExempt: boolean
    scheduleStartDate?: string
    scheduleEndDate?: string
    employeeFte: number
  }
  glInfo: {
    account?: string
    accountDescription?: string
    accountDescriptionAbrev?: string
    benefitGroup?: string
    benefitGroupName?: string
    group?: string
    groupName?: string
    option: string
  }
  userDefinedDates: {
    date1?: string
    date2?: string
    date3?: string
    date4?: string
    date5?: string
    date6?: string
    date7?: string
    date8?: string
    date9?: string
    date10?: string
    date11?: string
    date12?: string
    date1Name?: string
    date2Name?: string
    date3Name?: string
    date4Name?: string
    date5Name?: string
    date6Name?: string
    date7Name?: string
    date8Name?: string
    date9Name?: string
    date10Name?: string
    date11Name?: string
    date12Name?: string
  }
  userDefinedValues: {
    dedFig1: number
    dedFig2: number
    dedFig3: number
    dedFig4: number
    dedFig5: number
    dedFig6: number
    dedFig7: number
    dedFig8: number
    dedFig9: number
    dedFig10: number
    dedFig11: number
    dedFig12: number
    dedFig13: number
    dedFig14: number
    dedFig15: number
    otherText1?: string
    otherText2?: string
    otherText3?: string
    otherText4?: string
    otherText5?: string
    otherText6?: string
    otherText7?: string
    otherText8?: string
    otherText9?: string
    otherText10?: string
    otherText11?: string
    otherText12?: string
    otherText13?: string
    otherText14?: string
    otherText15?: string
    otherText16?: string
    otherText17?: string
    otherText18?: string
    otherText19?: string
    otherText20?: string
    dedFigName1?: string
    dedFigName2?: string
    dedFigName3?: string
    dedFigName4?: string
    dedFigName5?: string
    dedFigName6?: string
    dedFigName7?: string
    dedFigName8?: string
    dedFigName9?: string
    dedFigName10?: string
    dedFigName11?: string
    dedFigName12?: string
    dedFigName13?: string
    dedFigName14?: string
    dedFigName15?: string
    textFieldName1?: string
    textFieldName2?: string
    textFieldName3?: string
    textFieldName4?: string
    textFieldName5?: string
    textFieldName6?: string
    textFieldName7?: string
    textFieldName8?: string
    textFieldName9?: string
    textFieldName10?: string
    textFieldName11?: string
    textFieldName12?: string
    textFieldName13?: string
    textFieldName14?: string
    textFieldName15?: string
    textFieldName16?: string
    textFieldName17?: string
    textFieldName18?: string
    textFieldName19?: string
    textFieldName20?: string
  }
  position: {
    code?: string
    name?: string
    nameFrM?: string
    nameFrF?: string
    reportsToPosition?: string
    reportsToPositionName?: string
    reportsToPositionNameFrF?: string
    reportsToPositionNameFrM?: string
    primaryPosition?: string
    employeeFte: number
    totalActiveFte: string
    reportsToEmployee?: string
    effectiveDate?: string
    expiryDate?: string
    active: boolean
  }
  employeePositions?: Array<{
    position?: string
    positionName?: string
    active?: string
    payrate: number
    payRateUOM: string
    effectiveDate?: string
    expiryDate?: string
    rateSource: 0 | 1 | 2 | 3
    positionFte: number
    positionRateLevel: number
    ytdUnits: number
    ytdUOM?: string
  }>
  ytdLtdPositionUnits?: Array<{
    position?: string
    positionName?: string
    rateLevel: number
    ytdUnits: number
    ytdUOM?: string
    ltdUnits: number
    ltdUOM: string
  }>
}

/*
 * Get Employee Personal Info
 */

export interface GetEmployeePersonalInfoResponse {
  photoRevision?: number
  userName?: string
  givenName?: string
  surname?: string
  initial?: string
  preferredName?: string
  address1?: string
  address2?: string
  city?: string
  province?: string
  country?: 'CAN' | 'USA' | string
  postal?: string
  birthDate: string
  seniorityDate: string
  firstLanguage: string
  gender: 'F' | 'M' | 'X'
  marital: 'M' | 'S' | 'D' | 'E' | 'F' | 'G' | string
  sin?: string
  previousSurname?: string
  sinExpiryDate?: string
  temporarySin: boolean
  phoneType1: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  phoneNumber1?: string
  phoneType2: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  phoneNumber2?: string
  phoneType3: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  phoneNumber3?: string
  phoneType4: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  phoneNumber4?: string
  email?: string
  emailType1: 0 | 1 | 2 | 3 | 4 | 5
  email1?: string
  emailType2: 0 | 1 | 2 | 3 | 4 | 5
  email2?: string
  emailType3: 0 | 1 | 2 | 3 | 4 | 5
  email3?: string
  emailType4: 0 | 1 | 2 | 3 | 4 | 5
  email4?: string
  emailType5: 0 | 1 | 2 | 3 | 4 | 5
  email5?: string
  otherText1?: string
  otherText2?: string
  otherText3?: string
  otherText4?: string
  otherText5?: string
  otherText6?: string
  otherText7?: string
  otherText8?: string
  otherText9?: string
  otherText10?: string
  otherText11?: string
  otherText12?: string
  otherText13?: string
  otherText14?: string
  otherText15?: string
  otherText16?: string
  otherText17?: string
  otherText18?: string
  otherText19?: string
  otherText20?: string
  dedFig1: number
  dedFig2: number
  dedFig3: number
  dedFig4: number
  dedFig5: number
  dedFig6: number
  dedFig7: number
  dedFig8: number
  dedFig9: number
  dedFig10: number
  dedFig11: number
  dedFig12: number
  dedFig13: number
  dedFig14: number
  dedFig15: number
  otherDate1?: string
  otherDate2?: string
  otherDate3?: string
  otherDate4?: string
  otherDate5?: string
  otherDate6?: string
  otherDate7?: string
  otherDate8?: string
  otherDate9?: string
  otherDate10?: string
  otherDate11?: string
  otherDate12?: string
  initialHireDate: string
  accumServHrs: number
  vacDate: string
  empNo?: string
  position?: string
  positionName?: string
  positionNameFr?: string
  active: boolean
  webStatements: boolean
  payGroup?: string
  location?: string
  provinceEmployed?: string
  fte: number
  wcbGroup?: string
  vacGroup?: string
  vacCode?: '0' | '1' | '2' | '3'
  vacEarnCode?: string
  unionCode?: string
  glType?: 'a' | 'g'
  glGroup?: string
  earnGl?: string
  workGroup?: string
  jobStatus?: string
  smoker: string
  lastHireDate: string
  prevVacEarn: number
  prevWcbEarn: number
  prevMiscEarnAccum1: number
  prevMiscEarnAccum2: number
  prevMiscEarnAccum3: number
  prevMiscEarnAccum4: number
  prevMiscEarnAccum5: number
  prevMiscEarnAccum6: number
  prevMiscEarnAccum7: number
  prevMiscEarnAccum8: number
  prevVacHrs: number
  prevWcbHrs: number
  prevWcbPremHrs: number
  prevMiscUnitsAccum1: number
  prevMiscUnitsAccum2: number
  prevMiscAccum16: number
  prevMiscAccum17: number
  prevMiscAccum18: number
  prevMiscAccum19: number
  prevMiscAccum20: number
  prevMiscAccum21: number
  prevMiscAccum22: number
  prevMiscAccum23: number
  prevMiscAccum24: number
  prevMiscAccum25: number
  prevMiscAccum26: number
  prevMiscAccum27: number
  prevMiscAccum28: number
  prevMiscAccum29: number
  prevMiscAccum30: number
  roleAssignmentPermissions?: Array<{
    roleId?: string
    roleType: number
    startDate: string
    expiryDate: string
    approvalLevel: number
    insertData: boolean
    modifyData: boolean
    viewData: boolean
    deleteData: boolean
    viewAmounts: boolean
    createTime: boolean
  }>
  employeeNameFormat: number
  fullName?: string
}

/*
 * Get Time Entries
 */

export interface GetTimeEntriesRequest
  extends Record<string, string | number | boolean | undefined> {
  before?: boolean
  date: string
  empNo?: string
  endDate?: string
  id?: number
  skip?: number
  take?: number
}

export interface GetTimeEntriesTimeEntry {
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
  glSegment: Array<{
    no: number
    value?: string
    description?: string
  }>
  documents?: Array<{
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
  }>
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
  timeCardOverrides?: Array<{
    apply: boolean
    type: 0 | 1
    ruleId?: string
    typeDescription?: string
    description?: string
  }>
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

/*
 * Get Time Entry Templates
 */

export interface GetTimeEntryTemplatesRequest
  extends Record<string, string | undefined> {
  empNo?: string
  viewId?: string
}

export interface GetTimeEntryTemplatesTimeEntryTemplate {
  templateId?: string
  name?: string
  nameFr?: string
  priority: number
  source: 0 | 1 | 2 | 3 | 4 | 5
  copyUnits: boolean
  doNotSpanDays: boolean
  fields?: Array<{
    name?: string
    index: number
    key?: string
    isDetail: boolean
    isVisible: boolean
    isReadOnly: boolean
    isRequired: boolean
    sortOrder: number
    defaultValue: unknown
    filters?: Array<{
      codes?: string
      value: unknown
    }>
    header?: string
    headerFr?: string
    customHeader?: string
    customHeaderFr?: string
    customSetting?: string
    isDateField: boolean
    validation?: Array<{
      validation?: string
      validationMessage?: string
      validationMessageFr?: string
    }>
  }>
  filters?: Array<{
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
  }>
  criteria?: Array<{
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
  }>
  validation?: Array<{
    expression?: string
    type: 0 | 1 | 2 | 3
    onLoad: boolean
    message?: string
    messageFr?: string
  }>
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
  glSegmentFields?: Array<{
    name?: string
    index: number
    key?: string
    isDetail: boolean
    isVisible: boolean
    isReadOnly: boolean
    isRequired: boolean
    sortOrder: number
    defaultValue?: unknown
    filters?: Array<{
      codes?: string
      value: unknown
    }>
    header?: string
    headerFr?: string
    customHeader?: string
    customHeaderFr?: string
    customSetting?: string
    isDateField: boolean
    validation?: Array<{
      validation?: string
      validationMessage?: string
      validationMessageFr?: string
    }>
  }>
}
