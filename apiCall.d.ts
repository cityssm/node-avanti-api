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
export declare function callApi(apiEndpoint: string, apiOptions: ApiOptions): Promise<unknown>;
export {};
