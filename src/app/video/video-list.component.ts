import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getVideos, getVideosState } from './video.actions';
import { Video } from './video';
import { compose } from '@ngrx/core/compose';

@Component({
  template: '<video-list [videos]="videos$ | async"></video-list>'
})
export class VideoListComponent {
  videos$: Observable<Video[]>;
  constructor(store: Store<any>) {
    this.videos$ = store.let(compose(getVideos(), getVideosState()));
  }
}

@Component({
  selector: 'video-list',
  template: require('./video-list.html'),
  styles: [require('./video-list.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListEntriesComponent {
  @Input() videos: Video[];
}
