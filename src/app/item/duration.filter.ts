import { Injectable, Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (!value) {
      return value;
    }
    return value / 3600
  }
}
