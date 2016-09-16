import { itemReducer } from './item.reducer';
import { List, OrderedMap, Seq, OrderedSet } from 'immutable';
import { LoadItemsAction, ItemsLoadedAction } from './item.actions';
import { Item, IndexItem } from './item';

const item = (_id, title, mimetype='video/mp4', modified=new Date()): IndexItem => {
  return {_id, title, mimetype, modified, complete_name: title} as Item;
}

describe('Item reducer', () => {
  it('should have initial state', () => {
    const initialState = itemReducer(undefined, {type: undefined});
    expect(initialState.ids.size).toBe(0);
    expect(initialState.items.size).toBe(0);
    expect(initialState.index.size).toBe(0);
  });

  it('should load items and ids correctly', () => {
    const initialItems = OrderedMap([['1', 'a'], ['2', 'b'], ['3', 'c']]);
    const initialState = {
      ids: OrderedSet(initialItems.keys()),
      items: initialItems
    }
    const newItems = [item('4', 'korv'), item('5', 'ost')];
    const newState = itemReducer(initialState, new ItemsLoadedAction(<Item[]>newItems));
    expect(newState.ids.size).toBe(5);
    expect(newState.ids.toJS()).toEqual('12345'.split(''));
    expect(newState.items.get('5').title).toEqual('ost')
  });
});
