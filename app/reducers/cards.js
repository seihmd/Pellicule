import * as Types from '../utils/ActionTypes';
import * as Data from '../api/Data';

const initialState = Data.getLocalCards();

export default function cards(state = initialState, action) {
  switch (action.type) {
    case Types.ADD_SOME_CARDS:
      return [...action.cards, ...state];
    case Types.ADD_CARD:
      state = addCard(state, action.newCard);
      Data.updateLocalCards(state);
      return state;
    case Types.REMOVE_CARD:
      state = removeCard(state, action.id);
      Data.updateLocalCards(state);
      return state;
    case Types.UPDATE_CARD:
      state = updateCard(state, action.card)
      Data.updateLocalCards(state);
      return state;
    default:
      return state;
  }
}

function addCard(state, card) {
  // TODO ID may be able to be random char string
  return [{
      id: (state.reduce((card, next) => {
        return card.id > next.id ? card : next
      })).id + 1,
      text: card.text,
      boardId: 0,
      isLocal: true
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
  return state.map(card => {
    return card.id === editCard.id ? Object.assign({}, editCard) : card
  });
}
