import {Component, EventEmitter, OnInit} from '@angular/core';
import {Products, ProductSearch, ProductService} from "../shared/product.service";
import {FormControl} from "@angular/forms";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products:Observable<Products[]>;
  private keywords:string;
  searchEvent:EventEmitter<ProductSearch> = new EventEmitter();
  private titleFilter:FormControl =new FormControl();
  constructor(private prodcctservice:ProductService) { }

  ngOnInit() {

  this.products=this.prodcctservice.getProducts();
  this.titleFilter.valueChanges.debounceTime(500).subscribe(value=>this.keywords=value);
  this.prodcctservice.searchEvent.subscribe(

     params=>{this.products=this.prodcctservice.search(params);}
  )

  }

}

