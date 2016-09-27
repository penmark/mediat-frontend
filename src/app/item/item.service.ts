import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ItemsState } from './item.reducer';
import { Item } from './item';
import { Seq, OrderedMap } from 'immutable';
import { Observable } from 'rxjs';

interface AppState {
  item: ItemsState;
}

@Injectable()
export class ItemService {
  itemsState$ = this.store.select(s => s.item);
  itemFilter$ = this.itemsState$.select(s => s.itemFilter);
  searchFilter$ = this.itemsState$.select(s => s.searchFilter);
  items$ = this.itemsState$.select(s => s.items);
  ids$ = this.items$.map<Seq.Indexed<string>>(items => items.keySeq());

  constructor (private store: Store<AppState>) { }

  items(): Observable<Seq.Indexed<Item>> {
    return this.items$
      .map<Seq.Indexed<Item>>(items => items.valueSeq());
  }

  filter(predicate: (item: Item) => boolean): Observable<Seq.Indexed<Item>> {
    return this.items()
      .map(items => items.filter(item => predicate(item)))
  }

  filtered(): Observable<Seq.Indexed<Item>> {
    return this.items()
      .combineLatest(this.itemFilter$)
      .map(([items, filter]) => {
        if (filter) {
          return items.filter(filter)
        }
        return items
      })
      .combineLatest(this.searchFilter$)
      .map(([items, search]) => {
        if (search) {
          return items.filter(search)
        }
        return items
      })
  }

  item(id: string) {
    return this.itemsState$.select(s => s.items.get(id));
  }

  hasItem(id: string) {
    return this.items$.map(items => items.has(id))
  }

  transcoding(id: string) {
    return this.itemsState$.select(s => s.transcode.has(id))
  }
}
