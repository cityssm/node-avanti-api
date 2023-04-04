import type { ApiRequestCredentials } from './types';
export interface GetPersonalInfo_Response {
    userName?: string;
}
export declare function getReport(reportId: string, credentials: ApiRequestCredentials): Promise<any[]>;
export default getReport;
