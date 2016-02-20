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
          const checkList = card.checklists.length > 0 ? card.checklists[0].checkItems : [];
          const checkListId = card.checklists.length > 0 ? card.checklists[0].id : null;
          state.push({
            id: card.id,
            text: card.name,
            checkList: checkList,
            checkListsId: checkListId,
            due: card.due
          });
        });
        resolve(state);
      })
    }
  })
}
