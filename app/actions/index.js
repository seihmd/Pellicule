import * as Types from '../utils/ActionTypes';

export function addSomeCards(cards) {
  return {
    type: Types.ADD_SOME_CARDS,
    cards
  };
}

export function createNew(newCard) {
  return (dispatch) =>{
    dispatch({
      type: Types.ADD_CARD,
      newCard
    })
  }
}

export function removeCard(id) {
  return {
    type: Types.REMOVE_CARD,
    id
  }
}

export function updateCard(card){
  return {
    type: Types.UPDATE_CARD,
    card
  }
}
