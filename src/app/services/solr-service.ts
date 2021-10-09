import { Injectable } from "@angular/core";
import { Product } from "../shared/models/Product";
import { FilterMap, SearchRequestPayload, SortMap } from "../shared/models/SearchRequestPayload";
import { HttpService } from "./http-service";

@Injectable()
export class SolrService {
    SEARCH_API = 'search';
    constructor(private httpService:HttpService){}
    search(searchText:string, priceFilter:PriceFilter, sortMap:SortMap, filterMap:FilterMap){
        let payload:SearchRequestPayload = Object.create(null);
        payload.searchText = searchText;
        if(priceFilter.greaterThan || priceFilter.lessThan)
            payload.price = [priceFilter.lessThan, priceFilter.greaterThan];
        if(sortMap)
            payload.sortMap = sortMap;
        if(filterMap)
            payload.filterMap = filterMap;
        return this.httpService.post(this.SEARCH_API, JSON.stringify(payload));
        // let results:Product[]=[];
        // results.push({name:"Product 1", description:"This is product 1", id:1, category:"Electronics", price:999, quantity:2}); 
        // results.push({name:"Product 2", description:"This is product 2", id:2, category:"Electronics", price:1999, quantity:2}); 
        // results.push({name:"Product 3", description:"This is product 3", id:3, category:"Electronics", price:2999, quantity:2});
        // return results;
    }
}

export class PriceFilter {
    greaterThan:string;
    lessThan:string;
}