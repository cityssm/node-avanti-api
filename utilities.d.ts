export interface BasicObject {
    [key: string]: string | number;
}
export declare function objectToUrlSearchParameters(object: BasicObject): URLSearchParams;
