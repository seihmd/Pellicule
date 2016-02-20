import ApiKey from './ApiKey';
import NodeTrello from 'node-trello';
import Config from '../utils/Config';
import Promise from 'promise';

class Trello {
  constructor() {
    const TrelloToken = Config.userToken();
    this.trello = new NodeTrello(ApiKey.key, TrelloToken);
  }

  updateToken(token){
    this.trello = new NodeTrello(ApiKey.key, token);
  }

  getBoards() {
    return new Promise((resolve) => {
      this.trello.get("/1/members/me/boards?closed=false", (err, boards) => {
        if (err) throw err;
        boards = boards.filter((b) => {
          return !b.closed;
        });
        // console.log(boards);
        resolve(boards);
      });
    })
  }

  getLists(boardId) {
    return new Promise((resolve) => {
      this.trello.get("/1/boards/"+boardId+"/lists?", (err, lists) => {
        // console.log(err, lists);
        if (err) throw err;
        lists = lists.filter((l) => {
          return !l.closed;
        });
        resolve(lists);
      });
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
      this.trello.get(`/1/lists/${listId}/cards?checklists=all`, (err, cards) => {
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

    });
  }

  addCard(boardId, card) {}

  removeCard(boardId, cardId) {}
}

export default new Trello();
