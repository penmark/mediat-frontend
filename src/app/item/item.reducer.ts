import { ActionReducer } from '@ngrx/store';
import { Item, IndexItem } from './item';
import { ItemActions, ItemActionTypes } from './item.actions';
import { OrderedSet, OrderedMap, Seq } from 'immutable';

export interface ItemsState {
  ids: OrderedSet<string>;
  index: OrderedMap<string, IndexItem>;
  items: OrderedMap<string, Item>;
}
const initialState: ItemsState = {
  ids: OrderedSet<string>(),
  index: OrderedMap<string, IndexItem>(),
  items: OrderedMap<string, Item>()
};

const updateIds = (ids: OrderedSet<string>, items: IndexItem[]): OrderedSet<string> => {
  return ids.withMutations(set => {
    Seq(items).map(item => item._id).forEach(id => set.add(id))
  });
};

const updateEntities = (entities:  OrderedMap<string, Item>, items: IndexItem[]):  OrderedMap<string, Item> => {
  return entities.withMutations(map => {
    Seq(items).forEach(item => map.set(item._id, item))
  });
};

export const itemReducer: ActionReducer<any> = (state = initialState, action: ItemActions): ItemsState => {
  switch (action.type) {
    case ItemActionTypes.INDEX_LOADED: {
      const items = action.payload;
      const ids = updateIds(state.ids, items);
      const index = updateEntities(state.index, items as Item[]);
      return Object.assign({}, state, {ids, index});
    }
    case ItemActionTypes.ITEMS_LOADED: {
      const items = action.payload;
      const ids = updateIds(state.ids, items);
      const newItems = updateEntities(state.items, items);
      return Object.assign({}, state, {ids, items: newItems});
    }
    default:
      return state;
  }
};
