import { callApi, type ApiResponse } from './apiCall.js'

export interface GetEmployeePersonalInfo_Response {
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

/**
 * Endpoint: /v1/PersonalInfo
 * @param employeeNumber
 * @returns
 */
export async function getEmployeePersonalInfo(
  employeeNumber: string
): Promise<ApiResponse<GetEmployeePersonalInfo_Response>> {
  return (await callApi('/v1/PersonalInfo', {
    method: 'get',
    getParameters: {
      empNo: employeeNumber
    }
  })) as ApiResponse<GetEmployeePersonalInfo_Response>
}
