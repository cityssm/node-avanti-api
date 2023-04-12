import 'core-js/actual/object/index.js';
export interface Configuration {
    base_api_url: string;
    client_id: string;
    client_secret: string;
    username: string;
    password: string;
    company: string;
}
export declare function setConfiguration(config: Configuration): void;
type ApiOptions = {
    method: 'get';
    getParameters?: Record<string, string | number | boolean>;
} | {
    method: 'post';
    bodyParameters?: object;
};
export type ApiResponse<T> = {
    success: true;
    response: T;
} | {
    success: false;
    error: {
        type?: string;
        title?: string;
        status?: number;
        detail?: string;
        instance?: string;
        error?: Error;
    };
};
export declare function callApi(apiEndpoint: string, apiOptions: ApiOptions): Promise<ApiResponse<unknown>>;
export {};
