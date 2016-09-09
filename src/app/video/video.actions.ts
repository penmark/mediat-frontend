import { Action } from '@ngrx/store';
import { Video } from './video';
import { VideosState } from './video.reducer';
import { Observable } from 'rxjs';

export const Types = {
  LOAD_VIDEOS: '[video] Load videos',
  VIDEOS_LOADED: '[video] Videos loaded'
};

export class LoadVideos implements Action {
  type = Types.LOAD_VIDEOS;
}

export class VideosLoaded implements Action {
  type = Types.VIDEOS_LOADED;
  constructor(public payload: Video[]) {}
}

export type All = LoadVideos | VideosLoaded;

export function getVideosState() {
  return (state$: Observable<any>) => state$
    .select(s => s.video)
}

export function getVideoEntities() {
  return (state$: Observable<VideosState>) => state$
    .select(s => s.entities)
}

export function getVideo(id: string) {
  return (state$: Observable<VideosState>) => state$
    .select(s => s.entities[id])
}

export function getVideos() {
  return (state$: Observable<VideosState>) => state$
    .let(getVideoEntities())
    .map(entities => Object.keys(entities).map(k => entities[k]))
}

export function hasVideo(id: string) {
  return (state$: Observable<VideosState>) => state$
    .select(s => s.ids.includes(id))
}
