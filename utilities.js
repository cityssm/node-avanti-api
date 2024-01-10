/**
 * Reformats parameters as an object into a URLSearchParams object.
 * @param {Record<string, string | number | boolean | undefined>} object - Parameters as an object.
 * @returns {URLSearchParams} Parameters formatted into a URLSearchParams object.
 */
export function objectToUrlSearchParameters(object) {
    const parameters = new URLSearchParams();
    for (const [key, value] of Object.entries(object)) {
        if (value !== undefined) {
            parameters.append(key, typeof value === 'string' ? value : value.toString());
        }
    }
    return parameters;
}
