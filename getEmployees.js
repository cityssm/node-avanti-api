import fetch from 'node-fetch';
export async function getEmployees(parameters, credentials) {
    const response = await fetch(credentials.base_api_url + '/v1/Employees', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials.access_token}`
        },
        body: JSON.stringify(parameters)
    });
    return (await response.json());
}
export default getEmployees;
