import { combineReducers } from 'redux';
import cards from './cards';
import newCard from './newCard';

const rootReducer = combineReducers({
  cards,
  newCard
});

export default rootReducer;
