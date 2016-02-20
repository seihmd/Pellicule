export default function TrelloToken(PublicKey){
  const TOKEN_KEY = 'user_token';
  if(localStorage.getItem(TOKEN_KEY)) return localStorage.getItem(TOKEN_KEY);

  import ApiKey from './ApiKey';
  const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const redirect = "https%3A%2F%2Fdevelopers.trello.com/";
  const tokenUrl = 'https://trello.com/1/connect?key='+PublicKey+'&name=Pellicule&response_type=token&return_url='+redirect;

  var win = new BrowserWindow({
    width: 800,
    height: 600,
    'node-integration': false
  });
  win.loadURL(tokenUrl);
  win.show();
  win.webContents.on('did-get-redirect-request', (event, oldUrl, returnUrl) => {
      var raw_code = /#token=([^&]*)/.exec(returnUrl) || null,
          accessToken = (raw_code && raw_code.length > 1) ? raw_code[1] : null,
          error = /\?error=(.+)$/.exec(returnUrl);
      if (accessToken) {
          window.localStorage.setItem(TOKEN_KEY, accessToken);
      }
      win.close();
      return accessToken;
  });
}
