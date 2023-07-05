export function objectToUrlSearchParameters(object) {
    const parameters = new URLSearchParams();
    for (const [key, value] of Object.entries(object)) {
        if (value !== undefined) {
            parameters.append(key, typeof value === 'string' ? value : value.toString());
        }
    }
    return parameters;
}
