import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as itemActions from './item.actions';
import { ApiService } from '../api/api.service';

@Injectable()
export class ItemEffects {
  constructor(private updates$: Actions, private api: ApiService) { }
  @Effect() loadItems$ = this.updates$
    .ofType(itemActions.Types.LOAD_ITEMS)
    .startWith(new itemActions.LoadItems())
    .switchMap(() => this.api.items()
      .map(payload => new itemActions.ItemsLoaded(payload))
    );
}
