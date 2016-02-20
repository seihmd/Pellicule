import React, { Component, PropTypes } from 'react';
import NewCardContainer from './NewCard';
import CardsContainer from './Cards';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import DarkTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  //the key passed through context must be called "muiTheme"
 static childContextTypes  = {
  muiTheme: React.PropTypes.object,
}

getChildContext() {
  return {
    muiTheme: ThemeManager.getMuiTheme(DarkTheme)
  };
}

  render() {
    return (
      <div>
        <NewCardContainer />
        <CardsContainer />
      </div>
    );
  }
}
