import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { ItemService } from './item.service';


@Injectable()
export class ItemsLoadedGuard implements CanActivate {
  constructor(private itemService: ItemService) {
  }

  waitForItemsToLoad() {
    return this.itemService.items()
      .filter(items => items && items.length > 0)
      .take(1);
  }

  hasItem(id: string) {
    return this.itemService.hasItem(id)
      .take(1);
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.waitForItemsToLoad()
      .switchMapTo(this.hasItem(route.params['itemId']));
  }
}
