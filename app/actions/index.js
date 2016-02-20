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

export function updateCard(cardId, text){
  return {
    type: Types.UPDATE_CARD,
    cardId,
    text
  }
}

export function updateCheckList(cardId, checkListId, checkList){
  return {
    type: Types.UPDATE_CHECKLIST,
    cardId,
    checkListId,
    checkList
  }
}
