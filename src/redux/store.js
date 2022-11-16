import { createStore } from 'redux';
import reducer from './modules/reudcer';

const store = createStore(reducer);

export default store;
