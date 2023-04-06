let _apiConfiguration;
let _accessTokenTimeMillis;
let _accessToken;
export function setConfiguration(config) {
    _apiConfiguration = config;
}
import _getAccessToken from './getAccessToken.js';
async function getAccessToken() {
    if (_accessToken === undefined ||
        _accessTokenTimeMillis + _accessToken.expires_in <= Date.now()) {
        _accessTokenTimeMillis = Date.now();
        _accessToken = await _getAccessToken(_apiConfiguration);
    }
    return _accessToken;
}
import { getEmployees as _getEmployees } from './getEmployees.js';
export async function getEmployees(parameters) {
    const accessToken = await getAccessToken();
    return await _getEmployees(parameters, {
        base_api_url: _apiConfiguration.base_api_url,
        access_token: accessToken.access_token
    });
}
import { getTimeEntries as _getTimeEntries } from './getTimeEntries.js';
export async function getTimeEntries(viewId, templateId, parameters) {
    const accessToken = await getAccessToken();
    return await _getTimeEntries(viewId, templateId, parameters, {
        base_api_url: _apiConfiguration.base_api_url,
        access_token: accessToken.access_token
    });
}
import { getTimeEntryTemplates as _getTimeEntryTemplates } from './getTimeEntryTemplates.js';
export async function getTimeEntryTemplates(parameters) {
    const accessToken = await getAccessToken();
    return await _getTimeEntryTemplates(parameters, {
        base_api_url: _apiConfiguration.base_api_url,
        access_token: accessToken.access_token
    });
}
import { getReport as _getReport } from './getReport.js';
export async function getReport(reportId) {
    const accessToken = await getAccessToken();
    return await _getReport(reportId, {
        base_api_url: _apiConfiguration.base_api_url,
        access_token: accessToken.access_token
    });
}
