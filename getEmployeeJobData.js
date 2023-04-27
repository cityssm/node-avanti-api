import { callApi } from './apiCall.js';
export async function getEmployeeJobData(employeeNumber) {
    return (await callApi('/v1/EmployeeJobData', {
        method: 'get',
        getParameters: {
            empNo: employeeNumber
        }
    }));
}
