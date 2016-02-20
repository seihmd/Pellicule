import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Setting from '../components/Setting';
import * as Actions from '../actions/settingActions';
import Trello from '../api/Trello';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import DarkTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';

class SettingContainer extends Component {
  componentWillMount(){
    const {actions, setting} = this.props;
    if(!setting.connectTrello) return;
    Trello.getBoards().then(boards => {
      actions.updateBoards(boards);
      const selectedBoardId = setting.selectedBoardId || boards[0].id;
      Trello.getLists(selectedBoardId).then(lists => {
        actions.updateLists(lists);
      })
    });
  }

  render() {
    const { setting, actions } = this.props;
    if(!setting.showSetting) return null;
    return (<Setting setting={setting} actions={actions} />)
  }
}

function mapStateToProps(state) {
  return {
    setting: state.setting
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer);
