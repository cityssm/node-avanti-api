import type { AvantiApiConfiguration, AvantiApiOptions, AvantiApiResponse, GetEmployeeJobDataResponse, GetEmployeePersonalInfoResponse, GetEmployeesRequest, GetEmployeesResponse, GetTimeEntriesRequest, GetTimeEntriesTimeEntry, GetTimeEntryTemplatesRequest, GetTimeEntryTemplatesTimeEntryTemplate } from './types.js';
export declare class AvantiApi {
    #private;
    constructor(configuration: AvantiApiConfiguration);
    /**
     * Requests an API endpoint excluded from the included functions.
     * @param {string} apiEndpoint - ex. '/v1/Employees'
     * @param {AvantiApiOptions} apiOptions - API Options
     * @returns {Promise<AvantiApiResponse<unknown>>} API Response
     */
    callApi(apiEndpoint: `/v1/${string}`, apiOptions: AvantiApiOptions): Promise<AvantiApiResponse<unknown>>;
    /**
     * List Employees:
     * /v1/Employees
     * @param {GetEmployeesRequest} parameters - Request parameters
     * @returns {Promise<AvantiApiResponse<GetEmployeesResponse>>} See https://avanti.stoplight.io/docs/avanti-api/62932b8f232fb-list-employees
     */
    getEmployees(parameters: GetEmployeesRequest): Promise<AvantiApiResponse<GetEmployeesResponse>>;
    /**
     * Get Employee Job Data:
     * /v1/EmployeeJobData
     * @param {string} employeeNumber - Employee number
     * @returns {Promise<AvantiApiResponse<GetEmployeeJobDataResponse>>} See https://avanti.stoplight.io/docs/avanti-api/a44b4af6f1abd-get-employee-job-data
     */
    getEmployeeJobData(employeeNumber: string): Promise<AvantiApiResponse<GetEmployeeJobDataResponse>>;
    /**
     * Get Employee Personal Info:
     * /v1/PersonalInfo
     * @param {string} employeeNumber - Employee number
     * @returns {Promise<AvantiApiResponse<GetEmployeePersonalInfoResponse>>} See https://avanti.stoplight.io/docs/avanti-api/f851b988b5cf6-get-employee-personal-info
     */
    getEmployeePersonalInfo(employeeNumber: string): Promise<AvantiApiResponse<GetEmployeePersonalInfoResponse>>;
    /**
     * List Time Entries:
     * /v1/TimeManagement/{viewId}/{templateId}
     * @param {string} viewId - View Id
     * @param {string} templateId - Template Id
     * @param {GetTimeEntriesRequest} parameters - Request parameters
     * @returns {Promise<AvantiApiResponse<GetTimeEntriesTimeEntry[]>>} See https://avanti.stoplight.io/docs/avanti-api/4952dd2917595-list-time-entries
     */
    getTimeEntries(viewId: string, templateId: string, parameters: GetTimeEntriesRequest): Promise<AvantiApiResponse<GetTimeEntriesTimeEntry[]>>;
    /**
     * List Time Entry Templates:
     * /v1/TimeManagement/Templates
     * @param {GetTimeEntryTemplatesRequest} parameters - Request parameters
     * @returns {Promise<AvantiApiResponse<GetTimeEntryTemplatesTimeEntryTemplate[]>>} See https://avanti.stoplight.io/docs/avanti-api/faa0ddb0eb18d-list-time-entry-templates
     */
    getTimeEntryTemplates(parameters: GetTimeEntryTemplatesRequest): Promise<AvantiApiResponse<GetTimeEntryTemplatesTimeEntryTemplate[]>>;
    /**
     * Get Report Data:
     * /v1/Reporter/{reportId}
     * @param {string} reportId - The ID of the report you would like to get the data for.
     * @returns {Promise<AvantiApiResponse<object[]>>} See https://avanti.stoplight.io/docs/avanti-api/ed0485a9c98bb-get-report-data
     */
    getReport(reportId: string): Promise<AvantiApiResponse<object[]>>;
}
export * as lookups from './lookups.js';
export type * as types from './types.js';
