import { callApi } from './apiCall.js';
export async function getTimeEntryTemplates(parameters) {
    return (await callApi('/v1/TimeManagement/Templates', {
        method: 'get',
        getParameters: parameters
    }));
}
