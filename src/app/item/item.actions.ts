import { Action } from '@ngrx/store';
import { Item } from './item';
import { ItemsState } from './item.reducer';
import { Observable } from 'rxjs';

export const Types = {
  LOAD_ITEMS: '[item] Load items',
  ITEMS_LOADED: '[item] Items loaded'
};

export class LoadItems implements Action {
  type = Types.LOAD_ITEMS;
}

export class ItemsLoaded implements Action {
  type = Types.ITEMS_LOADED;
  constructor(public payload: Item[]) {}
}

export type All = LoadItems | ItemsLoaded;

export function getItemsState() {
  return (state$: Observable<any>) => state$
    .select(s => s.item)
}

export function getItemEntities() {
  return (state$: Observable<ItemsState>) => state$
    .select(s => s.entities)
}

export function getItem(id: string) {
  return (state$: Observable<ItemsState>) => state$
    .select(s => s.entities[id])
}

export function getItems() {
  return (state$: Observable<ItemsState>) => state$
    .let(getItemEntities())
    .map(entities => Object.keys(entities).map(k => entities[k]))
}

export function hasItem(id: string) {
  return (state$: Observable<ItemsState>) => state$
    .select(s => s.ids.includes(id))
}
