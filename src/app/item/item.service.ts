import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ItemsState } from './item.reducer';
import { Item } from './item';
import { List } from 'immutable';


interface AppState {
  item: ItemsState;
}

@Injectable()
export class ItemService {
  itemsState$ = this.store.select(s => s.item);
  items$ = this.itemsState$.select(s => s.items);
  ids$ = this.itemsState$.select(s => s.ids);

  constructor (private store: Store<AppState>) { }

  items() {
    return this.items$
      .map<Iterator<Item>>(items => items.values());
  }

  video() {
    return this.items$.filter(s => s.mimetype.startsWith('video'));
  }

  audio() {
    return this.items$.filter(s => s.mimetype.startsWith('audio'));
  }

  image() {
    return this.items$.filter(s => s.mimetype.startsWith('image'));
  }

  item(id: string) {
    return this.itemsState$.select(s => s.items.get(id));
  }

  hasItem(id: string) {
    return this.itemsState$.select(s => s.ids.includes(id));
  }
}
