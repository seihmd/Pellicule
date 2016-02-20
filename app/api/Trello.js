import TrelloToken from './TrelloAuth';
import ApiKey from './ApiKey';
import NodeTrello from 'node-trello';
import Promise from 'promise';

class Trello {
  constructor() {
    this.trello = new NodeTrello(ApiKey.key, TrelloToken);
  }

  getBoards() {
    this.trello.get("/1/members/me/boards?closed=false", (err, boards) => {
      if (err) throw err;
      console.log(boards);
      return boards.filter((b) => {
        return !b.closed;
      });
    });
  }

  getLists(boardId) {
    this.trello.get(`/1/boards/${boardId}/lists?cards=open`, (err, lists) => {
      if (err) throw err;
      console.log(lists.filter((l) => {
        return !l.closed;
      }));
    });
  }

  getList(listId) {
    this.trello.get(`/1/lists/${listId}`, (err, list) => {
      if (err) throw err;
      console.log(list);
      return list;
    })
  }

  getCardsInList(listId) {
    return new Promise((resolve) => {
      this.trello.get(`/1/lists/${listId}/cards`, (err, cards) => {
        if (err) throw err;
        resolve(cards);
      })
    })
  }

  getCards(cardId) {
    this.trello.get(`/1/cards/${cardId}/?closed=false`, (err, cards) => {
      if (err) throw err;
      console.log(cards);
    });
  }

  getCheckList(cardId) {
    this.trello.get(`/1/cards/${cardId}/checklists?closed=false`, (err, checkList) => {
      if (err) throw err;
      console.log(checkList);
    });
  }

  addCard(boardId, card) {}

  removeCard(boardId, cardId) {}
}

export default new Trello();
