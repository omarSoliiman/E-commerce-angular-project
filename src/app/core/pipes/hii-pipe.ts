import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hii'
})
export class HiiPipe implements PipeTransform {

  transform(myTitle : string): string {
    return "Hiii " + myTitle;
  }

}
