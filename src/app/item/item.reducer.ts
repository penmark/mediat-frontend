import { ActionReducer } from '@ngrx/store';
import { Item } from './item';
import { ItemActions, ItemActionTypes } from './item.actions';


export interface ItemsState {
  ids: string[];
  entities: {[id: string]: Item};
}
const initialState: ItemsState = {
  ids: [],
  entities: {}
};

export const itemReducer: ActionReducer<any> = (state = initialState, action: ItemActions): ItemsState => {
  switch (action.type) {
    case ItemActionTypes.ITEMS_LOADED: {
      const items = action.payload;
      const newItems = items.filter(item => !state.entities[item.id]);
      const newItemIds = newItems.map(item => item.id);
      const newItemEntities = newItems.reduce((entities: {[id: string]: Item}, item: Item) => {
        return Object.assign(entities, {[item.id]: item})
      }, {});
      return {
        ids: [...state.ids, ...newItemIds],
        entities: Object.assign({}, state.entities, newItemEntities)
      }
    }
    default:
      return state;
  }
};
