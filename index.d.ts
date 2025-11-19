import type { AvantiApiConfiguration, AvantiApiEndpoint, AvantiApiOptions, AvantiApiResponse, GetEmployeeEarningCodesEarningCode, GetEmployeeJobDataResponse, GetEmployeePersonalInfoResponse, GetEmployeesRequest, GetEmployeesResponse, GetTimeEntriesRequest, GetTimeEntriesTimeEntry, GetTimeEntryTemplatesRequest, GetTimeEntryTemplatesTimeEntryTemplate } from './types.js';
export declare const _defaultLatestASSP = true;
export declare class AvantiApi {
    #private;
    constructor(configuration: AvantiApiConfiguration);
    /**
     * Requests an API endpoint excluded from the included functions.
     * @param apiEndpoint - ex. '/v1/Employees'
     * @param apiOptions - API Options
     * @returns API Response
     */
    callApi<T>(apiEndpoint: AvantiApiEndpoint, apiOptions: AvantiApiOptions): Promise<AvantiApiResponse<T>>;
    /**
     * List Employees (Undocumented):
     * /v1/Employees
     * @param parameters - Request parameters
     * @returns A list of employees.
     */
    getEmployees(parameters: GetEmployeesRequest): Promise<AvantiApiResponse<GetEmployeesResponse>>;
    /**
     * List Employee Earning Codes:
     * /v1/EmployeeEarningCodes
     * @param employeeNumber - Employee number
     * @returns See https://help.avanti.ca/apidocs/list-employee-earning-codes-1
     */
    getEmployeeEarningCodes(employeeNumber?: string): Promise<AvantiApiResponse<GetEmployeeEarningCodesEarningCode[]>>;
    /**
     * Get Employee Job Data:
     * /v1/EmployeeJobData
     * @param employeeNumber - Employee number
     * @returns See https://help.avanti.ca/apidocs/get-employee-job-data-1
     */
    getEmployeeJobData(employeeNumber: string): Promise<AvantiApiResponse<GetEmployeeJobDataResponse>>;
    /**
     * Get Employee Personal Info:
     * /v1/PersonalInfo
     * @param employeeNumber - Employee number
     * @returns See https://help.avanti.ca/apidocs/get-employee-personal-info-1
     */
    getEmployeePersonalInfo(employeeNumber: string): Promise<AvantiApiResponse<GetEmployeePersonalInfoResponse>>;
    /**
     * List Time Entries:
     * /v1/TimeManagement/{viewId}/{templateId}
     * @param viewId - View Id
     * @param templateId - Template Id
     * @param parameters - Request parameters
     * @returns See https://help.avanti.ca/apidocs/list-time-entries-1
     */
    getTimeEntries(viewId: string, templateId: string, parameters: GetTimeEntriesRequest): Promise<AvantiApiResponse<GetTimeEntriesTimeEntry[]>>;
    /**
     * List Time Entry Templates:
     * /v1/TimeManagement/Templates
     * @param parameters - Request parameters
     * @returns See https://help.avanti.ca/apidocs/list-schedule-time-entry-templates
     */
    getTimeEntryTemplates(parameters: GetTimeEntryTemplatesRequest): Promise<AvantiApiResponse<GetTimeEntryTemplatesTimeEntryTemplate[]>>;
    /**
     * Get Report Data:
     * /v1/Reporter/{reportId}
     * @param reportId - The ID of the report you would like to get the data for.
     * @returns See https://help.avanti.ca/apidocs/get-report-data
     */
    getReport(reportId: string): Promise<AvantiApiResponse<object[]>>;
}
export * as lookups from './lookups.js';
export type { AvantiApiConfiguration } from './types.js';
export type * as types from './types.js';
