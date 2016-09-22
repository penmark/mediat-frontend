import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ApiService } from '../api/api.service';
import {
  ItemActionTypes, LoadItemsAction, ItemsLoadedAction, IndexLoadedAction,
  LoadIndexAction
} from './item.actions';

@Injectable()
export class ItemEffects {
  constructor(private updates$: Actions, private api: ApiService) { }

  @Effect() loadItems$ = this.updates$
    .ofType(ItemActionTypes.INDEX_LOADED)
    .switchMap(() => this.api.items()
      .map(payload => new ItemsLoadedAction(payload))
    );

  @Effect() loadIndex$ = this.updates$
    .ofType(ItemActionTypes.LOAD_INDEX)
    .startWith(new LoadIndexAction())
    .switchMap(() => this.api.index()
      .map(payload => new IndexLoadedAction(payload))
    );

  @Effect() startTranscode$ = this.updates$
    .ofType(ItemActionTypes.TRANSCODE_ITEM)
    .map(action => action.payload)
    .switchMap(item => this.api.transcode(item))
    .ignoreElements()
}
