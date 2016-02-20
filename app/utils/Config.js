class Config {
  constructor() {
    this.key = {
      CONFIG: 'config',
      USE_TRELLO: 'use_trello',
      USER_TOKEN: 'user_token',
      SELECTED_BOARD: 'selected_board_id',
      SELECTED_LIST: 'selected_list_id',
      USE_DARK_THEME: 'use_dark_theme',
    }
    let config = localStorage.getItem(this.key.CONFIG);
    if(config === null){
      this.settings = {};
      this.updateConfig();
    } else {
      this.settings = JSON.parse(config);
    }
  }

  updateConfig() {
    localStorage.setItem(this.key.CONFIG, JSON.stringify(this.settings));
  }

  useTrello(bool) {
    if (bool !== undefined) {
      this.settings[this.key.USE_TRELLO] = bool;
      this.updateConfig();
    } else {
      return this.settings[this.key.USE_TRELLO] || false;
    }
  }

  userToken(token){
    if(token !== undefined){
      localStorage.setItem(this.key.USER_TOKEN, token);
    } else {
      return localStorage.getItem(this.key.USER_TOKEN) || '';
    }
  }

  removeToken(){
    localStorage.removeItem(this.key.USER_TOKEN);
  }

  selectedBoard(boardId) {
    if (boardId !== undefined) {
      this.settings[this.key.SELECTED_BOARD] = boardId;
      this.updateConfig();
    } else {
      return this.settings[this.key.SELECTED_BOARD];
    }
  }

  selectedList(listId) {
    if (listId !== undefined) {
      this.settings[this.key.SELECTED_LIST] = listId;
      this.updateConfig();
    } else {
      return this.settings[this.key.SELECTED_LIST];
    }
  }

  useDarkTheme(useDark){
    if(useDark !== undefined){
      console.log(useDark);
      this.settings[this.key.USE_DARK_THEME] = useDark;
      this.updateConfig();
    } else {
      return this.settings[this.key.USE_DARK_THEME] || false;
    }
  }
}

export default new Config();
