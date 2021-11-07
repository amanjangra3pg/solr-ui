import { Injectable } from "@angular/core";
import { Product } from "../shared/models/Product";
import { SearchRequestPayload, SortMap } from "../shared/models/SearchRequestPayload";
import { HttpService } from "./http-service";

@Injectable()
export class SolrService {
    SEARCH_API = 'search';
    GET_PRODUCT_API = 'products/';
    DELETE_PRODUCT_API = 'product/';
    UPDATE_PRODUCT_API = 'product';
    constructor(private httpService:HttpService){}
    search(searchText:string, priceFilter:PriceFilter, sortMap:SortMap){
        let payload:SearchRequestPayload = Object.create(null);
        payload.searchText = searchText;
        if(priceFilter.greaterThan || priceFilter.lessThan)
            payload.filterMap['price'] = [priceFilter.lessThan, priceFilter.greaterThan];
        if(sortMap)
            payload.sortMap = sortMap;
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

    updateProduct(product:Object){
        return this.httpService.update(this.UPDATE_PRODUCT_API, product);
    }
}

export class PriceFilter {
    greaterThan:string;
    lessThan:string;
}