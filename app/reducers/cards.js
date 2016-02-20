import * as Types from '../utils/ActionTypes';

const initialState = [{
    id: 0,
    text: "Hello! Pellicule!!",
    boardId: 0
  }];

export default function cards(state = initialState, action) {
  switch (action.type) {
    case Types.LOAD_CARDS:
      return state;
    case Types.ADD_CARD:
      return addCard(state, action.newCard);
    case Types.REMOVE_CARD:
      return removeCard(state, action.id);
    case Types.UPDATE_CARD:
      return updateCard(state, action.card)
    default:
      return state;
  }
}

function addCard(state, card) {
  // TODO ID may be able to be random char string
  return [{
        id: (state.reduce((card, next) => {return card.id > next.id ? card : next})).id + 1,
        text: card.text,
        boardId: 0
      },
      ...state
    ]
}

function removeCard(state, id) {
  return state.filter((card) => {
    return card.id !== id;
  });
}

function updateCard(state, editCard) {
  let s = state.map( card => {
    return card.id === editCard.id
         ? Object.assign({}, editCard)
         : card
    });
  return s
}
