import { callApi } from './apiCall.js';
export async function getReport(reportId) {
    return (await callApi(`/v1/Reporter/${reportId}`, {
        method: 'get'
    }));
}
