import 'core-js/actual/object/index.js';
export interface Configuration {
    base_api_url: `https://myavanti.ca/${string}-api` | `https://stoplight.io/mocks/avanti/avanti-api/${string}`;
    client_id: string;
    client_secret: string;
    username: string;
    password: string;
    company: string;
    device_id?: string;
}
export declare function setConfiguration(config: Configuration): void;
type ApiOptions = {
    method: 'get';
    getParameters?: Record<string, string | number | boolean | undefined>;
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
export declare function callApi(apiEndpoint: `/v1/${string}`, apiOptions: ApiOptions): Promise<ApiResponse<unknown>>;
export {};
