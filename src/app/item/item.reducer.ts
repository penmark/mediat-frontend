import { ActionReducer } from '@ngrx/store';
import { Item } from './item';
import { ItemActions, ItemActionTypes } from './item.actions';
import { OrderedSet, OrderedMap, Seq, Map } from 'immutable';

export interface ItemsState {
  items: OrderedMap<string, Item>;
  transcode: Map<string, {}>;
  itemFilter: Function;
  searchFilter: Function;
}

const initialState: ItemsState = {
  items: OrderedMap<string, Item>(),
  transcode: Map<string, {}>(),
  itemFilter: null,
  searchFilter: null
};

const updateEntities = (entities:  OrderedMap<string, Item>, items: Item[]):  OrderedMap<string, Item> => {
  return entities.withMutations(map => {
    Seq(items).forEach(item => map.set(item._id, item))
  });
};

export const itemReducer: ActionReducer<any> = (state = initialState, action: ItemActions): ItemsState => {
  switch (action.type) {
    case ItemActionTypes.ITEMS_LOADED: {
      const items = updateEntities(state.items, action.payload);
      return Object.assign({}, state, {items});
    }
    case ItemActionTypes.TRANSCODE_PROGRESS: {
      const progress = action.payload;
      const transcode = state.transcode.set(progress._id, progress);
      return Object.assign({}, state, {transcode})
    }
    case ItemActionTypes.FILTER_ITEMS: {
      return Object.assign({}, state, {itemFilter: action.payload})
    }
    case ItemActionTypes.ITEM_SEARCH: {
      return Object.assign({}, state, {searchFilter: action.payload})
    }
    default:
      return state;
  }
};
