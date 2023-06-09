import { type ApiResponse } from './apiCall.js';
export interface GetEmployees_Request {
    skip?: number;
    take?: number;
    empNoReference?: string;
    search?: string;
    total?: boolean;
    active?: 0 | 1 | 2;
    sortOrder?: 0 | 1 | 2;
    sortDirection?: 0 | 1;
    takeOption?: 0 | 1;
    locations?: string[];
    employmentStatus?: string[];
    positions?: string[];
    sortDefinitions?: Array<{
        field?: string;
        dir?: string;
    }>;
}
export interface GetEmployees_Response {
    employees?: GetEmployees_Employee[];
    total?: number;
    index?: number;
}
export interface GetEmployees_Employee {
    empNo?: string;
    givenName?: string;
    surname?: string;
    preferredName?: string;
    initial?: string;
    positionName?: string;
    positionNameFr?: string;
    photoRevision?: number;
    active: boolean;
    email?: string;
}
export declare function getEmployees(parameters: GetEmployees_Request): Promise<ApiResponse<GetEmployees_Response>>;
