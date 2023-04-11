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
        device_id: 'node-avanti-api-' + Date.now()
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
    let access_token = _accessToken === null || _accessToken === void 0 ? void 0 : _accessToken.access_token;
    if (!access_token ||
        _accessTokenTimeMillis + _accessToken.expires_in <= Date.now()) {
        const accessTokenResponse = await refreshAccessToken();
        access_token = accessTokenResponse.access_token;
    }
    let requestUrl = _apiConfiguration.base_api_url + apiEndpoint;
    if (apiOptions.method === 'get' && apiOptions.getParameters) {
        requestUrl += '?' + objectToUrlSearchParameters(apiOptions.getParameters);
    }
    const fetchOptions = {
        method: apiOptions.method,
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    };
    if (apiOptions.method === 'post' && apiOptions.bodyParameters) {
        fetchOptions.body = JSON.stringify(apiOptions.bodyParameters);
        fetchOptions.headers['Content-Type'] = 'application/json';
    }
    const response = await fetch(requestUrl, fetchOptions);
    return await response.json();
}
