import { Component, OnInit,Input } from '@angular/core';
import {Comments, ProductService} from "../shared/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input()
  comments:Comments[];
  constructor(private routerInfo:ActivatedRoute ,
              private productService:ProductService
  ) { }

  ngOnInit() {

  }

}
