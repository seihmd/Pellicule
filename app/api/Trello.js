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

  createCheckList(cardId){
    this.trello.post(`/1/cards/${cardId}/checkLists`, (err) => {
      console.log(err);
    });
  }

  updateCardText(cardId, name){
    this.trello.put(`/1/cards/${cardId}/`, {name:name}, (err) => {
      console.log(err);
    });
  }

  updateCheckList(cardId, checkListId, checkItems){
    console.log(cardId);
    console.table(checkItems)
  }

  createCard(listId, name) {
    this.trello.post(`/1/cards/`, {name:name, due:null, idList:listId, urlSource:null}, (err) => {
      console.log(err);
    });
  }

  removeCard(cardId) {
    this.trello.del('/1/cards/' + cardId, (err) => {
      console.log(err);
    });
  }
}

export default new Trello();
