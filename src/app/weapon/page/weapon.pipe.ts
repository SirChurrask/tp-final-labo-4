import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weapon',
  standalone: true
})
export class WeaponPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
