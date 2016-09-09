import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { getItems, getItemsState, hasItem } from './item.actions';


@Injectable()
export class ItemsLoadedGuard implements CanActivate {
  constructor(private store: Store<any>, private router: Router) {}

  waitForItemsToLoad() {
    return this.store
      .let(compose(getItems(), getItemsState()))
      .filter(items => items && items.length > 0)
      .take(1);
  }

  hasItem(id: string) {
    return this.store
      .let(compose(hasItem(id), getItemsState()))
      .take(1);
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.waitForItemsToLoad().switchMapTo(this.hasItem(route.params['itemOid']));
  }
}
