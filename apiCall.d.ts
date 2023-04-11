import type { Configuration } from './types.js';
export declare function setConfiguration(config: Configuration): void;
type ApiOptions = {
    method: 'get';
    getParameters?: Record<string, string | number | boolean>;
} | {
    method: 'post';
    bodyParameters?: object;
};
export declare function callApi(apiEndpoint: string, apiOptions: ApiOptions): Promise<unknown>;
export {};
