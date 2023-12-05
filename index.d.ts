import type { AvantiApiConfiguration, AvantiApiOptions, AvantiApiResponse, GetEmployeeJobDataResponse, GetEmployeePersonalInfoResponse, GetEmployeesRequest, GetEmployeesResponse, GetTimeEntriesRequest, GetTimeEntriesTimeEntry, GetTimeEntryTemplatesRequest, GetTimeEntryTemplatesTimeEntryTemplate } from './types.js';
export declare class AvantiApi {
    #private;
    constructor(configuration: AvantiApiConfiguration);
    callApi(apiEndpoint: `/v1/${string}`, apiOptions: AvantiApiOptions): Promise<AvantiApiResponse<unknown>>;
    getEmployees(parameters: GetEmployeesRequest): Promise<AvantiApiResponse<GetEmployeesResponse>>;
    getEmployeeJobData(employeeNumber: string): Promise<AvantiApiResponse<GetEmployeeJobDataResponse>>;
    getEmployeePersonalInfo(employeeNumber: string): Promise<AvantiApiResponse<GetEmployeePersonalInfoResponse>>;
    getTimeEntries(viewId: string, templateId: string, parameters: GetTimeEntriesRequest): Promise<AvantiApiResponse<GetTimeEntriesTimeEntry[]>>;
    getTimeEntryTemplates(parameters: GetTimeEntryTemplatesRequest): Promise<AvantiApiResponse<GetTimeEntryTemplatesTimeEntryTemplate[]>>;
    getReport(reportId: string): Promise<AvantiApiResponse<object[]>>;
}
export * as lookups from './lookups.js';
export type * as types from './types.js';
