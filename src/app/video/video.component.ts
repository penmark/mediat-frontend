import { Component, Input, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from './video';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { ItemService } from '../item/item.service';


@Component({
  selector: 'video-player',
  template: require('./video.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent {
  @Input() video: Video;
  error: Event;
  constructor (private videoElem: ElementRef) {
    console.log(videoElem);
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
      .select<string>('videoId')
      .switchMap(id => itemService.item(id));
  }

}
