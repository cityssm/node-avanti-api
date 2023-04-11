import { callApi } from './apiCall.js';
export async function getTimeEntries(viewId, templateId, parameters) {
    return (await callApi(`/v1/TimeManagement/${viewId}/${templateId}`, {
        method: 'get',
        getParameters: parameters
    }));
}
