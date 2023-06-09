import { callApi, type ApiResponse } from './apiCall.js'

export interface GetEmployeeJobData_Response {
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

/**
 * Endpoint: /v1/EmployeeJobData
 * @param employeeNumber
 * @returns
 */
export async function getEmployeeJobData(
  employeeNumber: string
): Promise<ApiResponse<GetEmployeeJobData_Response>> {
  return (await callApi('/v1/EmployeeJobData', {
    method: 'get',
    getParameters: {
      empNo: employeeNumber
    }
  })) as ApiResponse<GetEmployeeJobData_Response>
}
