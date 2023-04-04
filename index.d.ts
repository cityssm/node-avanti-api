import type { Configuration } from './types.js';
export declare function setConfiguration(config: Configuration): void;
import { type GetEmployees_Request } from './getEmployees.js';
export declare function getEmployees(parameters: GetEmployees_Request): Promise<import("./getEmployees.js").GetEmployees_Response>;
export declare function getReport(reportId: string): Promise<any[]>;
