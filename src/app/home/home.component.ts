import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Product } from '../shared/models/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  results:Product[];
  suggestions:string[];
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  @ViewChild('fromFilter', { static: true }) fromInput: ElementRef;
  @ViewChild('toFilter', { static: true }) toInput: ElementRef;

  constructor() { }

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
    this.suggestions.push(searchTerm+'1');
    this.suggestions.push(searchTerm+'2');
    this.suggestions.push(searchTerm+'3');
    this.suggestions.push(searchTerm+'4');
    this.suggestions.push(searchTerm+'5');
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
      //Call Search Service
      this.results.push({name:"Product 1", description:"This is product 1", id:1, category:"Electronics", price:999, quantity:2}); 
      this.results.push({name:"Product 2", description:"This is product 2", id:2, category:"Electronics", price:1999, quantity:2}); 
      this.results.push({name:"Product 3", description:"This is product 3", id:3, category:"Electronics", price:2999, quantity:2}); 
    }
  }
  filterByPrice(){
    alert("Method not implemeted")
  }
}




