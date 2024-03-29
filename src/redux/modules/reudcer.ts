import { combineReducers } from 'redux';
import items from './items';

const reducer = combineReducers({ items });

export default reducer;

export type RootState = ReturnType<typeof reducer>;
