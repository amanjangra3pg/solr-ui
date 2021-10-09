export class SearchRequestPayload {
    searchText:string;
        sortMap:SortMap;
        filterMap:FilterMap;
        price:string[];
}
export class FilterMap {
    timestamp:string[];
    name:string[];
}
export class SortMap {
    name:SortOrder;
    timestamp:SortOrder;
}
export enum SortOrder {
    ASC = 'asc', DESC = 'desc'
}