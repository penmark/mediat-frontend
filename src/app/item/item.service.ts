import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ItemsState } from './item.reducer';
import { Item } from './item';
import { Seq, OrderedMap } from 'immutable';

interface AppState {
  item: ItemsState;
}

@Injectable()
export class ItemService {
  itemsState$ = this.store.select(s => s.item);
  items$ = this.itemsState$.select(s => s.items);
  ids$ = this.items$.map<Seq.Indexed<string>(items => items.keySeq());

  constructor (private store: Store<AppState>) { }

  items() {
    return this.items$
      .map<Seq.Indexed<Item>>(items => items.valueSeq());
  }

  filter(predicate: (item: Item) => boolean) {
    return this.items()
      .map(items => items.filter(item => predicate(item)))
  }

  video() {
    return this.filter(i => i.mimetype.startsWith('video'))
  }

  audio() {
    return this.filter(i => i.mimetype.startsWith('audio'))
  }

  image() {
    return this.filter(i => i.mimetype.startsWith('image'))
  }

  item(id: string) {
    return this.itemsState$.select(s => s.items.get(id));
  }

  hasItem(id: string) {
    return this.items$.map(items => items.has(id))
  }
}
