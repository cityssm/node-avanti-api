import { callApi } from './apiCall.js';
export async function getEmployeePersonalInfo(employeeNumber) {
    return (await callApi('/v1/PersonalInfo', {
        method: 'get',
        getParameters: {
            empNo: employeeNumber
        }
    }));
}
