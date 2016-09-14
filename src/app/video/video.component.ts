import { Component, Input, ChangeDetectionStrategy, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from './video';
import { Observable } from 'rxjs/Observable';
import { ItemService } from '../item/item.service';


@Component({
  selector: 'video-player',
  template: require('./video.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent {
  @Input() video: Video;
  @ViewChild('player') player: ElementRef;
  error: Event;

  constructor () {

  }

  ngAfterViewInit(): void {
    console.log('player', this.player);
  }

  onEvent(event) {
    console.log(event.type, event);
  }

  get videoSrc() {
    return 'http://media.wka.se' + this.video.complete_name.split(/\/media/)[1];
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
