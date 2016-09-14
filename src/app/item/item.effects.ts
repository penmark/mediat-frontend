import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ApiService } from '../api/api.service';
import { ItemActionTypes, LoadItemsAction, ItemsLoadedAction } from './item.actions';

@Injectable()
export class ItemEffects {
  constructor(private updates$: Actions, private api: ApiService) { }
  @Effect() loadItems$ = this.updates$
    .ofType(ItemActionTypes.LOAD_ITEMS)
    .startWith(new LoadItemsAction())
    .switchMap(() => this.api.items()
      .map(payload => new ItemsLoadedAction(payload))
    );
}
