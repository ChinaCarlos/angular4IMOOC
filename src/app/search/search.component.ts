import { Component, OnInit } from '@angular/core';
import {Products, ProductService} from "../shared/product.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
　 productCatgories:string[];
  formModel:FormGroup;
  //价格校验
   priceNumberValidator(control:FormControl){
     // console.log(control.value);
     if(!control.value){
       return null;
     }else{
       let price = parseInt(control.value);
       if(price>0){
          return null;
       }else{
         return  {priceNumber:true}
       }
     }
   }

  constructor(private  productService:ProductService) {


  }
  ngOnInit() {
    let fb = new FormBuilder();
    this.formModel=fb.group({

      productName:[null,Validators.minLength(3)],
      productPrice:[null,this.priceNumberValidator],
      productType:['-1']
    })
    this.productCatgories=this.productService.getAllCategories();
  }
  OnSearch(){
    if(this.formModel.valid){
      console.log(this.formModel.value);
      let data=this.formModel.value;
      this.productService.searchEvent.emit(data);
    }else{
       alert('数据填写不合格,无法提交');
       return false;
    }
  }

}
