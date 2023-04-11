export { setConfiguration } from './apiCall.js';
import { callApi } from './apiCall.js';
export async function getEmployees(parameters) {
    return await callApi('/v1/Employees', {
        method: 'post',
        bodyParameters: parameters
    });
}
export async function getTimeEntries(viewId, templateId, parameters) {
    return (await callApi(`/v1/TimeManagement/${viewId}/${templateId}`, {
        method: 'get',
        getParameters: parameters
    }));
}
export async function getTimeEntryTemplates(parameters) {
    return (await callApi('/v1/TimeManagement/Templates', {
        method: 'get',
        getParameters: parameters
    }));
}
export async function getReport(reportId) {
    return (await callApi(`/v1/Reporter/${reportId}`, {
        method: 'get'
    }));
}
