import { callApi } from './apiCall.js';
export async function getEmployees(parameters) {
    return (await callApi('/v1/Employees', {
        method: 'post',
        bodyParameters: parameters
    }));
}
