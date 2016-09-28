import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { ApiService } from '../api/api.service'
import { ItemActionTypes, LoadItemsAction, ItemsLoadedAction } from './item.actions'
import { HttpService } from '../api/http.service'
import { AuthService } from '../auth/auth.service'

@Injectable()
export class ItemEffects {
  constructor(private updates$: Actions, private api: ApiService, private http: HttpService, private auth: AuthService) { }

  @Effect() loadItems$ = this.updates$
    .ofType(ItemActionTypes.LOAD_ITEMS)
    .switchMap(() => this.api.items()
      .map(payload => new ItemsLoadedAction(payload))
    );

  @Effect() startTranscode$ = this.updates$
    .ofType(ItemActionTypes.TRANSCODE_ITEM)
    .map(action => action.payload)
    .switchMap(item => this.api.transcode(item))
    .ignoreElements();

  @Effect() login$ = this.updates$
    .ofType('[auth] Login')
    .switchMap(action => {
      return this.api.login(action.payload)
        .map(() => new LoadItemsAction())
        .catch((e, caught) => {
        console.log(e);
      })
    })
}
