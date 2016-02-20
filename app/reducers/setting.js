import * as Types from '../utils/ActionTypes';
import * as Data from '../api/Data';
import Config from '../utils/Config';
import Trello from '../api/Trello';
import getTrelloToken from '../api/TrelloAuth';

const initialState = {
    connectTrello: Config.useTrello(),
    boards: [],
    selectedBoardId: Config.selectedBoard(),
    lists: [],
    selectedListId: Config.selectedList(),
    useDarkTheme: Config.useDarkTheme(),
    showSetting: false
}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case Types.SHOW_SETTING:
      return showSetting(state, action.show);
    case Types.UPDATE_SETTINGS:
      return state;
    case Types.UPDATE_USE_DARK_THEME:
      return updateUseDarkTheme(state, action.use);
    case Types.UPDATE_USE_TRELLO:
      return updateUseTrello(state, action.use);
    case Types.UPDATE_BOARDS:
      return updateBoards(state, action.boards);
    case Types.UPDATE_SELECTED_BOARD:
      return updateSelectedBoard(state, action.boardId);
    case Types.UPDATE_LISTS:
      return updateLists(state, action.lists);
    case Types.UPDATE_SELECTED_LIST:
      return updateSelectedList(state, action.listId);
    default:
      return state;
  }
}

function updateUseTrello(state, use){
  let newState = Object.assign({}, state);
  newState.connectTrello = use;
  Config.useTrello(use);
  return newState;
  if(use && !Config.userToken()){
    const token = getTrelloToken();
    if(token){
      Config.userToken(token);
    }
  }
}

function updateUseDarkTheme(state, useDark){
  let newState = Object.assign({}, state);
  newState.useDarkTheme = useDark;
  Config.useDarkTheme(useDark);
  return newState;
}

function updateBoards(state, boards){
  let newState = Object.assign({}, state);
  newState.boards = boards;
  if(!newState.selectedBoardId){
    newState.selectedBoardId = boards[0] ? boards[0].id : null;
    Config.selectedBoard(newState.selectedBoardId);
  }
  return newState;
}

function updateSelectedBoard(state, boardId){
  let newState = Object.assign({}, state);
  newState.selectedBoardId = boardId;
  Config.selectedBoard(boardId);
  return newState;
}

function updateLists(state, lists){
  let newState = Object.assign({}, state);
  newState.lists = lists;
  if(!newState.selectedListId){
    newState.selectedListId = lists[0] ? lists[0].id : null;
    Config.selectedList(newState.selectedListId);
  }
  return newState;
}

function updateSelectedList(state, listId){
  let newState = Object.assign({}, state);
  newState.selectedListId = listId;
  Config.selectedList(listId);
  return newState;
}

function showSetting(state, show) {
  let newState = Object.assign({}, state);
  newState.showSetting = show;
  return newState;
}
