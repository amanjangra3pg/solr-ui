import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../shared/models/Product';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent implements OnInit {
  @Input() data:Product;
  constructor() { }

  ngOnInit(): void {
  }

}
