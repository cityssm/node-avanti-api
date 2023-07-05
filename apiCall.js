import 'core-js/actual/object/index.js';
import fetch from 'node-fetch';
import { objectToUrlSearchParameters } from './utilities.js';
let _apiConfiguration;
let _accessTokenTimeMillis = 0;
let _accessToken;
export function setConfiguration(config) {
    _apiConfiguration = config;
}
async function refreshAccessToken() {
    _accessTokenTimeMillis = Date.now();
    const requestObject = Object.assign({
        grant_type: 'password',
        device_id: 'node-avanti-api-' + Date.now().toString()
    }, _apiConfiguration);
    const request = objectToUrlSearchParameters(requestObject);
    const response = await fetch(_apiConfiguration.base_api_url + '/connect/token', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: request
    });
    _accessToken = (await response.json());
    return _accessToken;
}
export async function callApi(apiEndpoint, apiOptions) {
    let access_token = _accessToken?.access_token ?? '';
    if (access_token === '' ||
        _accessTokenTimeMillis + _accessToken.expires_in <= Date.now()) {
        const accessTokenResponse = await refreshAccessToken();
        access_token = accessTokenResponse.access_token;
    }
    let requestUrl = _apiConfiguration.base_api_url + apiEndpoint;
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
        fetchOptions.headers['Content-Type'] = 'application/json';
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
