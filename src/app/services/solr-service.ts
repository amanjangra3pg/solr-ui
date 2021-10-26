import { Injectable } from "@angular/core";
import { Product } from "../shared/models/Product";
import { FilterMap, SearchRequestPayload, SortMap } from "../shared/models/SearchRequestPayload";
import { HttpService } from "./http-service";

@Injectable()
export class SolrService {
    SEARCH_API = 'search';
    GET_PRODUCT_API = 'products/';
    DELETE_PRODUCT_API = 'product/';
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
    }

    getProduct(productId:number){   
        let  url = this.GET_PRODUCT_API+productId;
        return this.httpService.get(url);
    }

    deleteProduct(productId:number){   
        let  url = this.DELETE_PRODUCT_API+productId;
        return this.httpService.delete(url);
    }
}

export class PriceFilter {
    greaterThan:string;
    lessThan:string;
}