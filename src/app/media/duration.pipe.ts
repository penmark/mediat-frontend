import { Injectable, Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

const zeroPad = (num: number) => {
  return num < 10 ? `0${num}` : `${num}`
};

const toDuration = (time: number) => {
  const duration = moment.duration(time, 'seconds');
  return duration.hours() + ":" +
    zeroPad(duration.minutes()) + ":" +
    zeroPad(duration.seconds()) + "." +
    zeroPad(Math.round(duration.milliseconds() / 10));
};

@Pipe({name: 'duration', pure: true})
export class DurationPipe implements PipeTransform {
  transform(value: any, args: any): any {
    return toDuration(value || 0);
  }
}
