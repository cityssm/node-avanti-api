import type { Configuration } from './types.js';
export declare function setConfiguration(config: Configuration): void;
import { type GetEmployees_Request, type GetEmployees_Response } from './getEmployees.js';
export declare function getEmployees(parameters: GetEmployees_Request): Promise<GetEmployees_Response>;
import { type GetTimeEntries_Request, type GetTimeEntries_TimeEntry } from './getTimeEntries.js';
export declare function getTimeEntries(viewId: string, templateId: string, parameters: GetTimeEntries_Request): Promise<GetTimeEntries_TimeEntry[]>;
import { type GetTimeEntryTemplates_Request, type GetTimeEntryTemplates_TimeEntryTemplate } from './getTimeEntryTemplates.js';
export declare function getTimeEntryTemplates(parameters: GetTimeEntryTemplates_Request): Promise<GetTimeEntryTemplates_TimeEntryTemplate[]>;
export declare function getReport(reportId: string): Promise<object[]>;
