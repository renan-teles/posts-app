import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simpleCapitalize',
  standalone: true,
})
export class SimpleCapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
  }
}
