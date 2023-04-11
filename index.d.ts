import type * as types from './types';
export { setConfiguration } from './apiCall.js';
export declare function getEmployees(parameters: types.GetEmployees_Request): Promise<types.GetEmployees_Response>;
export declare function getTimeEntries(viewId: string, templateId: string, parameters: types.GetTimeEntries_Request): Promise<types.GetTimeEntries_TimeEntry[]>;
export declare function getTimeEntryTemplates(parameters: types.GetTimeEntryTemplates_Request): Promise<types.GetTimeEntryTemplates_TimeEntryTemplate[]>;
export declare function getReport(reportId: string): Promise<object[]>;
