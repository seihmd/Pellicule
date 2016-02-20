import * as Types from '../utils/ActionTypes';

export function showSetting(show){
  return {
    type: Types.SHOW_SETTING,
    show
  }
}

export function updateSettings(settings){
  return {
    type: Types.UPDATE_SETTINGS,
    settings
  }
}

export function updateUseDarkTheme(use){
  return {
    type: Types.UPDATE_USE_DARK_THEME,
    use: use
  }
}

export function updateUseTrello(use){
  return {
    type: Types.UPDATE_USE_TRELLO,
    use: use
  }
}

export function updateSelectedBoard(boardId){
  return {
    type: Types.UPDATE_SELECTED_BOARD,
    boardId
  }
}

export function updateSelectedList(listId){
  return {
    type: Types.UPDATE_SELECTED_LIST,
    listId
  }
}

export function updateBoards(boards){
  return {
    type: Types.UPDATE_BOARDS,
    boards
  }
}

export function updateLists(lists){
  return {
    type: Types.UPDATE_LISTS,
    lists
  }
}
