import { Action } from '@ngrx/store';
import { Item } from './item';
import { ItemsState } from './item.reducer';
import { Observable } from 'rxjs';

export const ItemActionTypes = {
  LOAD_ITEMS: '[item] Load items',
  ITEMS_LOADED: '[item] Items loaded'
};

export class LoadItemsAction implements Action {
  type = ItemActionTypes.LOAD_ITEMS;
  constructor() {}
}

export class ItemsLoadedAction implements Action {
  type = ItemActionTypes.ITEMS_LOADED;
  constructor(public payload: Item[]) {}
}

export type ItemActions = LoadItemsAction | ItemsLoadedAction;
