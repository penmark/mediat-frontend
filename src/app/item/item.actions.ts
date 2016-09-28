import { Action } from '@ngrx/store'
import { Item } from './item'

export const ItemActionTypes = {
  LOAD_ITEMS: '[item] Load items',
  ITEMS_LOADED: '[item] Items loaded',
  TRANSCODE_ITEM: '[item] Transcode item',
  TRANSCODE_PROGRESS: '[item] Transcode progress',
  FILTER_ITEMS: '[item] Filter items',
  ITEM_SEARCH: '[item] Search items'
};

export class LoadItemsAction implements Action {
  type = ItemActionTypes.LOAD_ITEMS;
  constructor() {}
}

export class ItemsLoadedAction implements Action {
  type = ItemActionTypes.ITEMS_LOADED;
  constructor(public payload: Item[]) {}
}

export class TranscodeItem implements Action {
  type = ItemActionTypes.TRANSCODE_ITEM;
  constructor(public payload: Item) {}
}

export class TranscodeProgress implements Action {
  type = ItemActionTypes.TRANSCODE_PROGRESS;
  constructor(public payload: {}) {}
}

export class FilterItems implements Action {
  type = ItemActionTypes.FILTER_ITEMS;
  constructor(public payload: Function) {}
}

export class ItemSearch implements Action {
  type = ItemActionTypes.ITEM_SEARCH;
  constructor(public payload: Function) {}
}

export type ItemActions =
    LoadItemsAction
  | ItemsLoadedAction
  | TranscodeItem
  | TranscodeProgress
  | FilterItems
  | ItemSearch
