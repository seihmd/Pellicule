import React, { Component, PropTypes } from 'react';
import NewCardContainer from './NewCard';
import SettingContainer from './Setting';
import CardsContainer from './Cards';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import DarkTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
import Config from '../utils/Config';
import styles from './Container.module.css';
import ClassNames from 'classnames';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  //the key passed through context must be called "muiTheme"
  static childContextTypes  = {
    muiTheme: React.PropTypes.object,
  }

  getChildContext() {
    const theme = Config.useDarkTheme() ? DarkTheme : LightTheme;
    return {
      muiTheme: ThemeManager.getMuiTheme(theme)
    };
  }

  render() {
    const theme = Config.useDarkTheme() ? 'darkTheme' : 'lightTheme';
    return (
      <div className={ClassNames(styles.container, styles[theme])}>
        <NewCardContainer />
        <SettingContainer />
        <CardsContainer />
      </div>
    );
  }
}
