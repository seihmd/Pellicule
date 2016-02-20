import * as Types from '../utils/ActionTypes';
import * as Data from '../api/Data';
import Config from '../utils/Config';
import Trello from '../api/Trello';

function getInitialState(){
  return Config.useTrello() && Config.userToken() !== '' ? [] : Data.getLocalCards();
}

export default function cards(state = getInitialState(), action) {
  switch (action.type) {
    case Types.ADD_SOME_CARDS:
      action.cards.forEach(card => {
        if(!card.checkList){
          card.checkList = [];
        }
      })
      return [...action.cards, ...state];

    case Types.ADD_CARD:
      state = addCard(state, action.newCard);
      if(Config.useTrello()){
        Trello.createCard(Config.selectedList(), action.newCard.text);
      } else {
        Data.updateLocalCards(state);
      }
      return state;

    case Types.REMOVE_CARD:
      state = removeCard(state, action.id);
      if(Config.useTrello()){
        Trello.removeCard(action.id);
      } else {
        Data.updateLocalCards(state);
      }
      return state;

    case Types.UPDATE_CARD:
      state = updateCard(state, action.cardId, action.text);
      if(Config.useTrello()){
        Trello.updateCardText(action.cardId, action.text);
      } else {
        Data.updateLocalCards(state);
      }
      return state;

    case Types.UPDATE_CHECKLIST:
      state = updateCheckList(state, action.cardId, action.checkList);
      if(Config.useTrello()){
        Trello.updateCheckList(action.cardId, action.checkListId, action.checkList);
      } else {
        Data.updateLocalCards(state);
      }
    default:
      return state;
  }
}

function addCard(state, card) {
  const {text, checkList, isLocal} = card;
  return [{
      id: state.length === 0
        ? 1
        : (state.reduce((card, next) => {return card.id > next.id ? card : next})).id + 1,
      text,
      checkList,
      isLocal: true,
    },
    ...state
  ]
}

function removeCard(state, id) {
  return state.filter((card) => {
    return card.id !== id;
  });
}

function updateCard(state, cardId, text) {
  state.forEach(card => {
    if (card.id === cardId) card.text = text;
  });
  return state;
}

function updateCheckList(state, cardId, checkList){
  state.forEach(card => {
    if(card.id === cardId) card.checkList = checkList;
  })
  return state;
}
