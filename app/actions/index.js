import * as Types from '../utils/ActionTypes';

export function loadCards() {
  return {
    type: Types.LOAD_CARDS
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
