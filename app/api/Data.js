import Config from '../utils/Config';
import Trello from './Trello';
import Promise from 'promise';

export function getLocalCards() {
  return JSON.parse(localStorage.getItem('cards'));
}

export function updateLocalCards(cards) {
  localStorage.setItem('cards', JSON.stringify(cards.filter((c) => {return c.isLocal})));
}

export function getTrelloCards() {
  return new Promise((resolve) => {
    let state = [];
    if (Config.useTrello() && Config.selectedList()) {
      Trello.getCardsInList(Config.selectedList()).then((cards) => {
        cards.forEach((card) => {
          state.push({
            id: card.id,
            text: card.name,
            checkList: card.checkItems,
            due: card.due,
            isLocal: false
          });
        });
        resolve(state);
      })
    }
  })
}
