import fetch from 'node-fetch';
export async function getReport(reportId, credentials) {
    const response = await fetch(credentials.base_api_url + '/v1/Reporter/' + reportId, {
        method: 'get',
        headers: {
            Authorization: `Bearer ${credentials.access_token}`,
            'Content-Type': 'application/json'
        }
    });
    return (await response.json());
}
export default getReport;
