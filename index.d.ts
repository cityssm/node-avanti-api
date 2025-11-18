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
     * List Employees:
     * /v1/Employees
     * @param parameters - Request parameters
     * @returns See https://avanti.stoplight.io/docs/avanti-api/62932b8f232fb-list-employees
     */
    getEmployees(parameters: GetEmployeesRequest): Promise<AvantiApiResponse<GetEmployeesResponse>>;
    /**
     * List Employee Earning Codes:
     * /v1/EmployeeEarningCodes
     * @param employeeNumber - Employee number
     * @returns See https://avanti.stoplight.io/docs/avanti-api/204d3078d2230-list-employee-earning-codes
     */
    getEmployeeEarningCodes(employeeNumber?: string): Promise<AvantiApiResponse<GetEmployeeEarningCodesEarningCode[]>>;
    /**
     * Get Employee Job Data:
     * /v1/EmployeeJobData
     * @param employeeNumber - Employee number
     * @returns See https://avanti.stoplight.io/docs/avanti-api/a44b4af6f1abd-get-employee-job-data
     */
    getEmployeeJobData(employeeNumber: string): Promise<AvantiApiResponse<GetEmployeeJobDataResponse>>;
    /**
     * Get Employee Personal Info:
     * /v1/PersonalInfo
     * @param employeeNumber - Employee number
     * @returns See https://avanti.stoplight.io/docs/avanti-api/f851b988b5cf6-get-employee-personal-info
     */
    getEmployeePersonalInfo(employeeNumber: string): Promise<AvantiApiResponse<GetEmployeePersonalInfoResponse>>;
    /**
     * List Time Entries:
     * /v1/TimeManagement/{viewId}/{templateId}
     * @param viewId - View Id
     * @param templateId - Template Id
     * @param parameters - Request parameters
     * @returns See https://avanti.stoplight.io/docs/avanti-api/4952dd2917595-list-time-entries
     */
    getTimeEntries(viewId: string, templateId: string, parameters: GetTimeEntriesRequest): Promise<AvantiApiResponse<GetTimeEntriesTimeEntry[]>>;
    /**
     * List Time Entry Templates:
     * /v1/TimeManagement/Templates
     * @param parameters - Request parameters
     * @returns See https://avanti.stoplight.io/docs/avanti-api/faa0ddb0eb18d-list-time-entry-templates
     */
    getTimeEntryTemplates(parameters: GetTimeEntryTemplatesRequest): Promise<AvantiApiResponse<GetTimeEntryTemplatesTimeEntryTemplate[]>>;
    /**
     * Get Report Data:
     * /v1/Reporter/{reportId}
     * @param reportId - The ID of the report you would like to get the data for.
     * @returns See https://avanti.stoplight.io/docs/avanti-api/ed0485a9c98bb-get-report-data
     */
    getReport(reportId: string): Promise<AvantiApiResponse<object[]>>;
}
export * as lookups from './lookups.js';
export type { AvantiApiConfiguration } from './types.js';
export type * as types from './types.js';
