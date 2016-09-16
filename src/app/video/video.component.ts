import { Component, Input, Output, ChangeDetectionStrategy, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from './video';
import { Observable } from 'rxjs/Observable';
import { ItemService } from '../item/item.service';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import * as moment from 'moment';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';


const toDuration = (time: number) => {
  const zeroPad = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`
  };
  const duration = moment.duration(time, 'seconds');
  return duration.hours() + ":" +
    zeroPad(duration.minutes()) + ":" +
    zeroPad(duration.seconds()) + "." +
    zeroPad(Math.round(duration.milliseconds() / 10));
}


@Component({
  selector: 'video-player',
  template: require('./video.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles : [ 'video { max-width: 100% }']
})
export class VideoPlayerComponent {
  @Input() video: Video;
  @ViewChild('playerRef') playerRef: ElementRef;
  currentTime = new ReplaySubject(2);
  player: HTMLVideoElement;
  error = false;
  duration: string;

  constructor () {
  }

  ngAfterViewInit(): void {
    console.log('viewInit');
    this.player = this.playerRef.nativeElement;
    this.currentTime.next(toDuration(0))
  }

  loaded() {
    this.duration = toDuration(this.player.duration)
    this.currentTime.subscribe(Observable.fromEvent(this.player, 'timeupdate', event => event.target.currentTime)
      .map(toDuration));
  }

  play() {
    this.player.paused ? this.player.play() : this.player.pause();
  }

  buffered(event) {
    console.log(event.target.buffered.end(0) / event.target.duration);
  }

  onEvent(event) {
    console.log(event.type, event);
  }

  get videoSrc() {
    return 'https://media.wka.se' + this.video.complete_name.split(/\/media/)[1];
  }
}

@Component({
  template: '<video-player [video]="video$ | async"></video-player>'
})
export class VideoComponent {
  video$: Observable<Video>;

  constructor(route: ActivatedRoute, itemService: ItemService) {
    this.video$ = route.params
      .select<string>('itemId')
      .switchMap(id => itemService.item(id));
  }

}
