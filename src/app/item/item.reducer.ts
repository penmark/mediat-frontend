import { ActionReducer } from '@ngrx/store';
import { Item, IndexItem } from './item';
import { ItemActions, ItemActionTypes } from './item.actions';
import { OrderedSet, OrderedMap, Seq } from 'immutable';

export interface ItemsState {
  index: OrderedMap<string, IndexItem>;
  items: OrderedMap<string, Item>;
}
const initialState: ItemsState = {
  index: OrderedMap<string, IndexItem>(),
  items: OrderedMap<string, Item>()
};

const updateEntities = (entities:  OrderedMap<string, IndexItem>, items: IndexItem[]):  OrderedMap<string, Item> => {
  return entities.withMutations(map => {
    Seq(items).forEach(item => map.set(item._id, item))
  });
};

export const itemReducer: ActionReducer<any> = (state = initialState, action: ItemActions): ItemsState => {
  switch (action.type) {
    case ItemActionTypes.INDEX_LOADED: {
      const index = updateEntities(state.index, action.payload as Item[]);
      return Object.assign({}, state, {index});
    }
    case ItemActionTypes.ITEMS_LOADED: {
      const items = updateEntities(state.items, action.payload);
      return Object.assign({}, state, {items: items});
    }
    default:
      return state;
  }
};
