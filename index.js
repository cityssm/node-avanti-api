import 'core-js/actual/object/index.js';
import fetch from 'node-fetch';
import { objectToUrlSearchParameters } from './utilities.js';
export class AvantiApi {
    #apiConfiguration;
    #accessTokenTimeMillis = 0;
    #accessToken;
    constructor(configuration) {
        this.#apiConfiguration = configuration;
    }
    async #refreshAccessToken() {
        this.#accessTokenTimeMillis = Date.now();
        const requestObject = Object.assign({
            grant_type: 'password',
            device_id: 'node-avanti-api-' + Date.now().toString()
        }, this.#apiConfiguration);
        const request = objectToUrlSearchParameters(requestObject);
        const response = await fetch(this.#apiConfiguration.base_api_url + '/connect/token', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: request
        });
        this.#accessToken = (await response.json());
        return this.#accessToken;
    }
    async callApi(apiEndpoint, apiOptions) {
        let access_token = this.#accessToken?.access_token ?? '';
        if (access_token === '' ||
            this.#accessTokenTimeMillis + (this.#accessToken?.expires_in ?? 0) <=
                Date.now()) {
            const accessTokenResponse = await this.#refreshAccessToken();
            access_token = accessTokenResponse.access_token;
        }
        let requestUrl = this.#apiConfiguration.base_api_url + apiEndpoint;
        if (apiOptions.method === 'get') {
            requestUrl +=
                '?' +
                    objectToUrlSearchParameters(apiOptions.getParameters ?? {}).toString();
        }
        const fetchOptions = {
            method: apiOptions.method,
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        };
        if (apiOptions.method === 'post') {
            fetchOptions.body = JSON.stringify(apiOptions.bodyParameters);
            fetchOptions.headers['Content-Type'] =
                'application/json';
        }
        const response = await fetch(requestUrl, fetchOptions);
        let parsingError;
        try {
            const json = (await response.json()) ?? {};
            if (typeof json === 'object' &&
                (Object.hasOwn(json, 'status') || Object.hasOwn(json, 'instance'))) {
                return {
                    success: false,
                    error: json
                };
            }
            return {
                success: true,
                response: json
            };
        }
        catch (error) {
            parsingError = error;
        }
        return {
            success: false,
            error: {
                title: 'callApi() error',
                status: 600,
                detail: parsingError === undefined ? undefined : parsingError.name,
                error: parsingError,
                instance: apiEndpoint
            }
        };
    }
    async getEmployees(parameters) {
        return (await this.callApi('/v1/Employees', {
            method: 'post',
            bodyParameters: parameters
        }));
    }
    async getEmployeeJobData(employeeNumber) {
        return (await this.callApi('/v1/EmployeeJobData', {
            method: 'get',
            getParameters: {
                empNo: employeeNumber
            }
        }));
    }
    async getEmployeePersonalInfo(employeeNumber) {
        return (await this.callApi('/v1/PersonalInfo', {
            method: 'get',
            getParameters: {
                empNo: employeeNumber
            }
        }));
    }
    async getTimeEntries(viewId, templateId, parameters) {
        return (await this.callApi(`/v1/TimeManagement/${viewId}/${templateId}`, {
            method: 'get',
            getParameters: parameters
        }));
    }
    async getTimeEntryTemplates(parameters) {
        return (await this.callApi('/v1/TimeManagement/Templates', {
            method: 'get',
            getParameters: parameters
        }));
    }
    async getReport(reportId) {
        return (await this.callApi(`/v1/Reporter/${reportId}`, {
            method: 'get'
        }));
    }
}
export * as lookups from './lookups.js';
