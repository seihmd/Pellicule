class Config {
  constructor() {
    this.key = {
      CONFIG: 'config',
      USE_TRELLO: 'use_trello',
      SELECTED_BOARD: 'selected_board_id',
      SELECTED_LIST: 'selected_list'
    }
    this.settings = JSON.parse(localStorage.getItem(this.key.CONFIG)) || {};
  }

  useTrello(bool) {
    if (bool) {
      this.settings[this.key.USE_TRELLO] = bool;
      this.updateConfig();
    } else {
      return localStorage.getItem(this.key.USE_TRELLO) || false;
    }
  }

  selectedBoard(boardId) {
    if (boardId) {
      this.settings[this.key.SELECTED_BOARD] = boardId;
      this.updateConfig();
    } else {
      return localStorage.getItem(this.key.SELECTED_BOARD);
    }
  }

  selectedList(listId) {
    if (listId) {
      this.settings[this.key.SELECTED_LIST] = listId;
      this.updateConfig();
    } else {
      return localStorage.getItem(this.key.SELECTED_LIST);
    }
  }

  updateConfig() {
    localStorage.setItem(this.key.CONFIG, JSON.stringify(this.settings));
  }
}

export default new Config();
