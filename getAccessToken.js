import fetch from 'node-fetch';
import { objectToUrlSearchParameters } from './utilities.js';
export async function getAccessToken(parameters) {
    const requestObject = Object.assign({
        grant_type: 'password',
        device_id: 'node-avanti-api-' + Date.now()
    }, parameters);
    const request = objectToUrlSearchParameters(requestObject);
    const response = await fetch(parameters.base_api_url + '/connect/token', {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: request
    });
    return (await response.json());
}
export default getAccessToken;
