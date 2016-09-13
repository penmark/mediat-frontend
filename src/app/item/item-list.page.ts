import { Component } from '@angular/core';
import { Item } from './item';
import { Observable } from 'rxjs';
import { ItemService } from './item.service';


@Component({
  template: '<item-list [items]="items$ | async"></item-list>'
})
export class ItemListPage {
  items$: Observable<Item[]>;

  constructor(itemService: ItemService) {
    this.items$ = itemService.items();
  }
}
