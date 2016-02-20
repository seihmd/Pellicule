import { LOAD_CARDS, ADD_CARD, REMOVE_CARD } from '../actions/cards';
import util from '../utils/util'

const initialState = [{
    id: 0,
    text: "this is a initial card",
    boardId: 0
  }];

export default function cards(state = initialState, action) {
  switch (action.type) {
    case LOAD_CARDS:
      return state;
    case ADD_CARD:
      var card = {text: "new card desu", boardId: 1}
      return util.addCard(state, card);
    case REMOVE_CARD:
      return util.removeCard(state, 0);
    default:
      console.log('pass default');
      console.log(state);
      return state;
  }
}
