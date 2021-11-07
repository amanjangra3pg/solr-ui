export class SearchRequestPayload {
    searchText:string;
        sortMap:SortMap;
        filterMap:object;
}
export class SortMap {
    name:SortOrder;
    timestamp:SortOrder;
}
export enum SortOrder {
    ASC = 'asc', DESC = 'desc'
}