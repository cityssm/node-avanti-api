export interface BasicObject {
    [key: string]: string | number | boolean;
}
export declare function objectToUrlSearchParameters(object: Record<string, string | number | boolean>): URLSearchParams;
