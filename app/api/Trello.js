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
    });
  }

  createCheckList(cardId){
    this.trello.post(`/1/cards/${cardId}/checkLists`, (err) => {
      if(err) console.log(err);
    });
  }

  updateCardText(cardId, name){
    this.trello.put(`/1/cards/${cardId}/`, {name:name}, (err) => {
      if(err) console.log(err);
    });
  }

  updateCheckList(cardId, checkListId, checkItems){
    if(checkListId){
      this.updateCheckListItems(cardId, checkListId, checkItems);
    } else {
      // add checklist to card
      this.trello.post(`/1/cards/${cardId}/checklists`, (err, res) => {
        if(err) console.log(err);
        if(!err){
          this.updateCheckListItems(cardId, res.id, checkItems)
        }
      });
    }
  }

  updateCheckListItems(cardId, checkListId, checkItems){
    const url = `/1/cards/${cardId}/checklist/${checkListId}/checkItem/`;
    checkItems.forEach((item)=>{
      if (item.id){
        // update existing checkItem
        this.trello.put(
          url + item.id,
          {name: item.name,
           state: item.state
          },
          (err) => {
            if(err) console.log(err);
          }
        );
      } else {
        // new checkItem
        this.trello.post(
          url,
          {name: item.name},
          (err) => {
            if(err) console.log(err);
          }
        );
      }
    })
  }

  createCard(listId, name) {
    this.trello.post(`/1/cards/`, {name:name, due:null, idList:listId, urlSource:null}, (err) => {
      if(err) console.log(err);
    });
  }

  removeCard(cardId) {
    this.trello.del('/1/cards/' + cardId, (err) => {
      if(err) console.log(err);
    });
  }
}

export default new Trello();
