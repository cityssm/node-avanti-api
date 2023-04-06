export interface BasicObject {
  [key: string]: string | number | boolean
}

export function objectToUrlSearchParameters(
  object: Record<string, string | number | boolean>
): URLSearchParams {
  const parameters = new URLSearchParams()

  for (const [key, value] of Object.entries(object)) {
    parameters.append(key, typeof value === 'string' ? value : value.toString())
  }

  return parameters
}
