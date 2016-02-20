import { combineReducers } from 'redux';
import cards from './cards';
import newCard from './newCard';
import setting from './setting';

const rootReducer = combineReducers({
  cards,
  newCard,
  setting,
});

export default rootReducer;
