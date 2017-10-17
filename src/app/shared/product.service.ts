import {EventEmitter, Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
@Injectable()
export class ProductService {
  // dataProductsScoucce:Observable<any>;
 searchEvent:EventEmitter<ProductSearch>= new EventEmitter();





  constructor(private http:Http) {

    // this.dataProductsScoucce=this.http.get('/api/product/1/comments').map((res)=>res.json());
    // this.dataProductsScoucce.subscribe(
    //   data=>{console.log(data)},
    //   error=>console.log('获取数据出错'+error),
    //   ()=>console.log('获取数据失败')
    // );
  }

  getProducts():Observable<Products[]>{
     return this.http.get('/api/products').map((res)=>res.json());
  }
  getProduct(id: number):Observable<Products>{
    return this.http.get('/api/product/'+id).map((res)=>res.json());

  }
  getAllCategories():string[]{


    return ['电子产品','家用电器','生活用品','硬件设备'];
  }

  getComment(id: number):Observable<Comments[]>{
    return this.http.get('/api/product/'+id+'/comments').map((res)=>res.json());

  }


   private  enCodeParams(params: ProductSearch) {

     return Object.keys(params)
      .filter(key=>params[key])
      .reduce((sum:URLSearchParams,key:string)=>{
          sum.append(key,params[key]);
          return sum;

      },new URLSearchParams());


  }
  search(params:ProductSearch):Observable<Products[]>{

    return this.http.get('/api/products/search',{search:this.enCodeParams(params)}).map((res)=>res.json());
  }
}
export class Products {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public stars: number,
    public introduction: string,
    public imgUrl: string,
    public categories: Array<string>
  ){

  }
}
export class Comments{
  constructor(
    public id:number,
    public productId:number,
    public times:string,
    public user:string,
    public satrs:number,
    public content:string

  ){

  }
}
export class ProductSearch{

  constructor(
    public productName:string,
    public productPrice:number,
    public productType:string
  ){

  }


}
