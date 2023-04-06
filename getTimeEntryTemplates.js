import fetch from 'node-fetch';
import { objectToUrlSearchParameters } from './utilities.js';
export async function getTimeEntryTemplates(parameters, credentials) {
    const urlParameters = objectToUrlSearchParameters(parameters);
    const requestUrl = `${credentials.base_api_url}/v1/TimeManagement/Templates?${urlParameters.toString()}`;
    const response = await fetch(requestUrl, {
        method: 'get',
        headers: {
            Authorization: `Bearer ${credentials.access_token}`
        }
    });
    return (await response.json());
}
export default getTimeEntryTemplates;
