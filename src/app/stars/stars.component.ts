import {Component, EventEmitter, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Input,Output} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {
  @Input()
  private rating:number=0;
  private stars:boolean[];
  @Output()
  clickRating:EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }
  ngOnChanges(changes:SimpleChanges){
    var flag=[];
    for(let i=1;i<=5;i++){

      flag.push(i > this.rating);
    }
    this.stars=flag;

  }
  getIndex(index:number){
    // console.log(index+1);
    this.rating=index+1;
    this.ngOnInit();
    this.clickRating.emit((index+1));


  }

}
