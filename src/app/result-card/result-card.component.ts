import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolrService } from '../services/solr-service';
import { Product } from '../shared/models/Product';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent implements OnInit {
  @Input() data:Product;
  @Input() searchText:string;
  @Input() deleteProductById: (id:number) => void
  @ViewChild('productModal', { static: true }) productModal: ElementRef;
  @ViewChild('productUpdateModal', { static: true }) updateProductModal: ElementRef;
  fields:Field[] = [];
  constructor(private solrService:SolrService, private modal:NgbModal) { }

  ngOnInit(): void {
    this.initFieldsArray();
  }
  destroy:boolean=false;
  initFieldsArray(){
    Object.keys(this.data).forEach(key => {
      let field:Field = new Field(key, this.data[key]+'');
      this.fields.push(field);
    });
  }

  openProductDetailModel(product:Product){
    this.solrService.getProduct(product.id).subscribe(res => {
      console.log('res product', res);
      this.modal.open(this.productModal);
    });
  }

  openUpdateProductModel(product:Product){
    this.solrService.getProduct(product.id).subscribe(res => {
      console.log('res product', res);
      this.modal.open(this.updateProductModal);
    });
  }

  updateProduct(product:Object){
    this.solrService.updateProduct(product).subscribe(res => {
      //reload
    });
  }

  onSubmit(formData){
    this.updateProduct(formData.value);
    return false; //don't submit
  }

  closeModal(modal){
    modal.close();
  }
}
export class Field {
  name:string;
  value:string;
  constructor(name:string, value:string){
    this.name = name;
    this.value = value;
  }
}