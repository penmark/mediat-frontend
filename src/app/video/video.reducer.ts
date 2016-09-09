import { ActionReducer } from '@ngrx/store';
import * as itemActions from '../item/item.actions';
import * as videoActions from './video.actions';
import { Video } from './video';


export interface VideosState {
  ids: string[];
  entities: {[id: string]: Video};
}
const initialState: VideosState = {
  ids: [],
  entities: {}
};

export const videoReducer: ActionReducer<any> = (state = initialState, action: itemActions.All|videoActions.All): VideosState => {
  switch (action.type) {
    case itemActions.Types.ITEMS_LOADED: {
      const videos: Video[] = action.payload;
      const newVideos = videos.filter(video => video.mimetype.startsWith('video') && !state.entities[video.id]);
      const newVideoIds = newVideos.map(video => video.id);
      const newVideoEntities = newVideos.reduce((entities: {[id: string]: Video}, video: Video) => {
        return Object.assign(entities, {[video.id]: video})
      }, {});
      return {
        ids: [...state.ids, ...newVideoIds],
        entities: Object.assign({}, state.entities, newVideoEntities)
      }
    }
    default:
      return state;
  }
};
