import {
  Component, Input, Output, ChangeDetectionStrategy, ElementRef, ViewChild, OnInit,
  EventEmitter
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from './video';
import { Observable } from 'rxjs/Observable';
import { ItemService } from '../item/item.service';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';

import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import { Store } from '@ngrx/store';
import { TranscodeItem } from '../item/item.actions';

@Component({
  selector: 'video-player',
  template: require('./video.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles : [ 'video { max-width: 100% }']
})
export class VideoPlayerComponent {
  @Input() video: Video;
  @Output() transcode = new EventEmitter();

  @ViewChild('playerRef') playerRef: ElementRef;
  currentTime = new ReplaySubject(2);
  player: HTMLVideoElement;
  error = false;
  duration: number;

  constructor () {
  }

  ngAfterViewInit(): void {
    console.log('viewInit');
    this.player = this.playerRef.nativeElement;
    this.currentTime.next(0)
  }

  loaded() {
    this.duration = this.player.duration;
    this.currentTime.subscribe(
      Observable.fromEvent(this.player, 'timeupdate', event => event.target.currentTime)
    );
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
  template: '<video-player [video]="video$ | async" (transcode)="transcode($event)"></video-player>'
})
export class VideoComponent implements OnInit {
  video$: Observable<Video>;

  constructor(private route: ActivatedRoute, private itemService: ItemService, private store: Store<any>) {}

  ngOnInit() {
    this.video$ = this.route.params
      .select<string>('itemId')
      .switchMap(id => this.itemService.item(id));
  }

  transcode(video) {
    this.store.dispatch(new TranscodeItem(video))
  }
}
