import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PriceFilter, SolrService } from '../services/solr-service';
import { Product } from '../shared/models/Product';
import { SortMap, SortOrder } from '../shared/models/SearchRequestPayload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  results:Product[];
  suggestions:string[];
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  @ViewChild('fromFilter', { static: false }) fromInput: ElementRef;
  @ViewChild('toFilter', { static: false }) toInput: ElementRef;

  constructor(private solrService:SolrService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          if(event.key == 'Enter'){
            this.search(event.target.value);
            return '';
          }
          this.suggestions = [];
          this.results = [];
          return event.target.value;
        }),
        // Time in milliseconds between key events
        debounceTime(1000),
        // If previous query is diffent from current
        distinctUntilChanged(),
        // subscription for response
      )
      .subscribe((text: string) => {
        if(text && text != '')
          this.setSuggestions(text);
      });
  }
  setSuggestions(searchTerm:string) {
    //Call getSuggestions Service
    this.suggestions = [];
    // this.suggestions.push(searchTerm+'1');
    // this.suggestions.push(searchTerm+'2');
    // this.suggestions.push(searchTerm+'3');
    // this.suggestions.push(searchTerm+'4');
    // this.suggestions.push(searchTerm+'5');
  }
  suggestionClickHandler(suggestion:string){
    this.searchInput.nativeElement.value = suggestion;
    this.suggestions = [];
    this.search(suggestion);
  }
  search(searchText?:string){
    if(!searchText)
      searchText = this.searchInput.nativeElement.value;
    
    this.suggestions = [];  
    this.results = [];
    
    if(searchText){
      let from = this.fromInput?.nativeElement.value;
      let to = this.toInput?.nativeElement.value;
      let priceFilter:PriceFilter = Object.create(null);
      if(this.fromInput)
        priceFilter.lessThan = from;
      if(this.toInput)
        priceFilter.greaterThan = to;

      let sortMap:SortMap = Object.create(null);
      sortMap.name = SortOrder.ASC;
      sortMap.timestamp = SortOrder.DESC;
      
      let ret = this.solrService.search(searchText, priceFilter, sortMap, null).subscribe(res=> {
        this.results = res;
      })
      
    }
  }
  filterByPrice(){
    this.search();
  }
}




