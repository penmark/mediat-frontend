import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as itemActions from './item.actions';
import { ItemService } from './item.service';

@Injectable()
export class ItemEffects {
  constructor(private updates$: Actions, private itemService: ItemService) { }
  @Effect() loadItems$ = this.updates$
    .ofType(itemActions.Types.LOAD_ITEMS)
    .startWith(new itemActions.LoadItems())
    .switchMap(() => this.itemService.items()
      .map(payload => new itemActions.ItemsLoaded(payload))
    );
}
