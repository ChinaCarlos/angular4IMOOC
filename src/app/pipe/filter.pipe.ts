import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[],filterField:string,keywords:string): any {
    if(!filterField || ! keywords){
      return list;
    }
    return list.filter(item=>{
      let value=item[filterField];//根据title搜索
      return value.indexOf(keywords)>=0;
    });
  }

}
