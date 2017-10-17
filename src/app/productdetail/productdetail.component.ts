import { Component, OnInit,SimpleChanges,OnChanges } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Comments, Products, ProductService} from "../shared/product.service";
import {Observable} from "rxjs/Observable";
import {WebsocketService} from "../shared/websocket.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
   product:Products;
   productID:number;
   isWatch:boolean=false;
   currentPrice:number;
   subscription:Subscription;
   dataProductSource:Observable<Products>;
   dataCommentSoucre:Observable<Comments[]>;
   comments:Comments[];
  isAddCommentArea:boolean=true;
  clickRating:number=0;
  commentContent:string="";



  constructor(private routerInfo:ActivatedRoute ,
              private productService:ProductService,
              private websocketservice: WebsocketService
  ) { }

  ngOnInit() {

    let productId=Number.parseInt(this.routerInfo.snapshot.queryParams['productId']);
    this.productID=productId;

    this.dataProductSource=this.productService.getProduct(productId);
    this.dataProductSource.subscribe(
      data=>{this.product=data;this.currentPrice=this.product.price},
      error=>console.log('获取对应的商品信息'),
      ()=>console.log('获取对应信息结束')
    );
    // console.log(this.product);
    this.dataCommentSoucre=this.productService.getComment(productId);
    this.dataCommentSoucre.subscribe(
      data=>{this.comments=data;},
      error=>console.log('获取对应的商品留言失败'),
      ()=>console.log('获取留言结束')
    );
    // this.comments=this.productService.getComment(productId);
    // console.log(this.comments);

  }

  submitComment(){
   // console.log(this.clickRating,this.commentContent);

   let newComment=new Comments(9,this.productID,'2017 08 18 15:32','root',this.clickRating,this.commentContent);
   this.comments.unshift(newComment);
   // console.log(this.comments.length);
   //重置评论表单
    this.clickRating=0;
    this.commentContent="";
    this.isAddCommentArea=true;
  }
  OnWacth(event:any){

   if(this.subscription){
     this.subscription.unsubscribe();
     this.isWatch=false;
     this.subscription=null;
   }else{
     this.isWatch=true;
     this.subscription=this.websocketservice.createObservableSocket('ws://localhost:8085').subscribe(
       data => {console.log(data),this.currentPrice=data;},
       error => console.log(error),
       () => console.log('websocket end')
     );
     this.sendMessageToserver(this.productID,this.isWatch);
   }

  }
  getRating(event:number){
    // console.log(event);获取评分等级
    this.clickRating=event;
  }
  sendMessageToserver(id:number,isWatch:boolean){

    let str=[id,isWatch];
    this.websocketservice.sendMessage(str);
  }

}
