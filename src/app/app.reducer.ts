import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';
import { combineReducers } from '@ngrx/store';
import { itemReducer } from './item/item.reducer';

export const appReducer = compose(storeLogger(), combineReducers)({
  item: itemReducer,
});
