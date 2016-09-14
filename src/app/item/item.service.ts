import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Store } from '@ngrx/store';
import { ItemsState } from './item.reducer';

@Injectable()
export class ItemService {
  itemsState$ = this.store.select(s => s.item);
  entities$ = this.itemsState$.select(s => s.entities);
  ids$ = this.itemsState$.select(s => s.ids);

  constructor (private store: Store<ItemsState>) { }

  items() {
    return this.entities$
      .map(entities => Object.keys(entities).map(k => entities[k]));
  }

  video() {
    return this.entities$.filter(s => s.mimetype.startsWith('video'));
  }

  audio() {
    return this.entities$.filter(s => s.mimetype.startsWith('audio'));
  }

  image() {
    return this.entities$.filter(s => s.mimetype.startsWith('image'));
  }

  item(id: string) {
    return this.itemsState$.select(s => s.entities[id]);
  }

  hasItem(id: string) {
    return this.itemsState$.select(s => s.ids.includes(id));
  }
}
