import Debug from 'debug';
import { objectToUrlSearchParameters } from './utilities.js';
const debug = Debug('avanti-api');
export const _defaultLatestASSP = false;
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
            device_id: this.#apiConfiguration.device_id ??
                `node-avanti-api-${Date.now().toString()}`
        }, {
            client_id: this.#apiConfiguration.client_id,
            client_secret: this.#apiConfiguration.client_secret,
            username: this.#apiConfiguration.username,
            password: this.#apiConfiguration.password,
            company: this.#apiConfiguration.company
        });
        const request = objectToUrlSearchParameters(requestObject);
        const accessTokenUrl = (this.#apiConfiguration.latestASSP ?? _defaultLatestASSP)
            ? 'https://auth.myavanti.ca/connect/token'
            : `https://myavanti.ca/${this.#apiConfiguration.tenant}-api/connect/token`;
        debug(`Access token request: ${accessTokenUrl}`);
        const response = await fetch(accessTokenUrl, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-tenant': this.#apiConfiguration.tenant
            },
            body: request
        });
        this.#accessToken = (await response.json());
        return this.#accessToken;
    }
    /**
     * Requests an API endpoint excluded from the included functions.
     * @param apiEndpoint - ex. '/v1/Employees'
     * @param apiOptions - API Options
     * @returns API Response
     */
    async callApi(apiEndpoint, apiOptions) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        let access_token = this.#accessToken?.access_token ?? '';
        if (access_token === '' ||
            this.#accessTokenTimeMillis + (this.#accessToken?.expires_in ?? 0) <=
                Date.now()) {
            const accessTokenResponse = await this.#refreshAccessToken();
            access_token = accessTokenResponse.access_token;
        }
        let requestUrl = (this.#apiConfiguration.latestASSP ?? _defaultLatestASSP)
            ? `https://${this.#apiConfiguration.tenant}.myavanti.ca/API${apiEndpoint}`
            : `https://myavanti.ca/${this.#apiConfiguration.tenant}-api${apiEndpoint}`;
        debug(`API request: ${requestUrl}`);
        if (apiOptions.method === 'get') {
            requestUrl += `?${objectToUrlSearchParameters(apiOptions.getParameters ?? {}).toString()}`;
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
                (Object.hasOwn(json, 'status') ||
                    Object.hasOwn(json, 'instance'))) {
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
    /**
     * List Employees:
     * /v1/Employees
     * @param parameters - Request parameters
     * @returns See https://avanti.stoplight.io/docs/avanti-api/62932b8f232fb-list-employees
     */
    async getEmployees(parameters) {
        return (await this.callApi('/v1/Employees', {
            method: 'post',
            bodyParameters: parameters
        }));
    }
    /**
     * List Employee Earning Codes:
     * /v1/EmployeeEarningCodes
     * @param employeeNumber - Employee number
     * @returns See https://avanti.stoplight.io/docs/avanti-api/204d3078d2230-list-employee-earning-codes
     */
    async getEmployeeEarningCodes(employeeNumber) {
        return (await this.callApi('/v1/EmployeeEarningCodes', {
            method: 'get',
            getParameters: {
                empNo: employeeNumber
            }
        }));
    }
    /**
     * Get Employee Job Data:
     * /v1/EmployeeJobData
     * @param employeeNumber - Employee number
     * @returns See https://avanti.stoplight.io/docs/avanti-api/a44b4af6f1abd-get-employee-job-data
     */
    async getEmployeeJobData(employeeNumber) {
        return (await this.callApi('/v1/EmployeeJobData', {
            method: 'get',
            getParameters: {
                empNo: employeeNumber
            }
        }));
    }
    /**
     * Get Employee Personal Info:
     * /v1/PersonalInfo
     * @param employeeNumber - Employee number
     * @returns See https://avanti.stoplight.io/docs/avanti-api/f851b988b5cf6-get-employee-personal-info
     */
    async getEmployeePersonalInfo(employeeNumber) {
        return (await this.callApi('/v1/PersonalInfo', {
            method: 'get',
            getParameters: {
                empNo: employeeNumber
            }
        }));
    }
    /**
     * List Time Entries:
     * /v1/TimeManagement/{viewId}/{templateId}
     * @param viewId - View Id
     * @param templateId - Template Id
     * @param parameters - Request parameters
     * @returns See https://avanti.stoplight.io/docs/avanti-api/4952dd2917595-list-time-entries
     */
    async getTimeEntries(viewId, templateId, parameters) {
        return (await this.callApi(`/v1/TimeManagement/${viewId}/${templateId}`, {
            method: 'get',
            getParameters: parameters
        }));
    }
    /**
     * List Time Entry Templates:
     * /v1/TimeManagement/Templates
     * @param parameters - Request parameters
     * @returns See https://avanti.stoplight.io/docs/avanti-api/faa0ddb0eb18d-list-time-entry-templates
     */
    async getTimeEntryTemplates(parameters) {
        return (await this.callApi('/v1/TimeManagement/Templates', {
            method: 'get',
            getParameters: parameters
        }));
    }
    /**
     * Get Report Data:
     * /v1/Reporter/{reportId}
     * @param reportId - The ID of the report you would like to get the data for.
     * @returns See https://avanti.stoplight.io/docs/avanti-api/ed0485a9c98bb-get-report-data
     */
    async getReport(reportId) {
        return (await this.callApi(`/v1/Reporter/${reportId}`, {
            method: 'get'
        }));
    }
}
export * as lookups from './lookups.js';
