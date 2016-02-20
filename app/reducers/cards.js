import { LOAD_CARDS, ADD_CARD, REMOVE_CARD } from '../utils/ActionTypes';
// import {addCard, removeCard} from '../utils/util'

const initialState = [{
    id: 0,
    text: "Hello! Pellicule!!",
    boardId: 0
  }];

export default function cards(state = initialState, action) {
  switch (action.type) {
    case LOAD_CARDS:
      return state;
    case ADD_CARD:
      return addCard(state, action.newCard);
    case REMOVE_CARD:
      return removeCard(state, 0);
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
    card.id !== id;
  });
}
