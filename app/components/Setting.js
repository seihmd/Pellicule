import React, { Component, PropTypes } from 'react';
import styles from './Setting.module.css';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import MenuItem from 'material-ui/lib/menus/menu-item';
import SelectField from 'material-ui/lib/select-field';
import Toggle from 'material-ui/lib/toggle';
import RaisedButton from 'material-ui/lib/raised-button';
import Trello from '../api/Trello';
import Config from '../utils/Config';
import {ipcRenderer} from 'electron';

class Setting extends Component {
  constructor(props, context){
    super(props, context);
    this.state = Object.assign({}, this.props.setting);
    this.initialState = Object.assign({}, this.props.setting);
    this.changed = false;
  }

  componentWillReceiveProps(nextProps){
    this.setState(nextProps.setting);
    this.initialState = Object.assign({}, nextProps.setting);
    this.changed = false;
  }

  toggleConnectTrello(e, toggled){
    this.setState({connectTrello: toggled});
  }

  toggleTheme(e, toggled){
    this.setState({useDarkTheme: toggled});
  }

  handleBoardChange(e,i,boardId){
    if(this.state.selectedBoardId === boardId) return;
    this.setState({selectedBoardId:boardId});

    Trello.getLists(boardId).then(lists => {
      let id_name_lists = [];
      lists.forEach(list => {
        id_name_lists.push(list);
      });
      this.setState({lists: id_name_lists});
      this.setState({selectedListId: id_name_lists[0].id});
    });
  }

  handleListChange(e,i,listId){
    if(this.state.selectedListId === listId) return;
    this.setState({selectedListId: listId});
  }

  settingsChanged(){
    let changed = this.state.connectTrello !== this.initialState.connectTrello
               || this.state.useDarkTheme  !== this.initialState.useDarkTheme;
    if(this.state.connectTrello && !changed){
      changed = this.state.selectedBoardId !== this.initialState.selectedBoardId
             || this.state.selectedListId  !== this.initialState.selectedListId
    }
    return changed;
  }

  handleUpdate(e,a){
    Config.useTrello(this.state.connectTrello);
    Config.useDarkTheme(this.state.useDarkTheme);
    Config.selectedBoard(this.state.selectedBoardId);
    Config.selectedList(this.state.selectedListId);
    ipcRenderer.send('reload');
  }

  handleCancel(){
    this.props.actions.showSetting(false);
  }

  render() {
    const {showSetting, connectTrello, useDarkTheme} = this.state;
    if(showSetting){
      return (
        <div className={styles.settingContainer}>
          <Card className={styles.settingCard} >
            <CardText>
              <Toggle label="Connect Trello"
                defaultToggled={connectTrello}
                onToggle={this.toggleConnectTrello.bind(this)}/>
              {this.renderSelects()}
              <Toggle label="Dark Theme"
                defaultToggled={useDarkTheme}
                onToggle={this.toggleTheme.bind(this)}/>
            </CardText>
            <CardActions>
              <RaisedButton label="update"
                primary={true}
                disabled={!this.settingsChanged()}
                onClick={this.handleUpdate.bind(this)} />
              <RaisedButton label="cancel"
                onClick={this.handleCancel.bind(this)} />
            </CardActions>
          </Card>
        </div>
      );
    } else {
      return null;
    }
  }

  renderSelects(){
    const {connectTrello, boards, selectedBoardId, lists, selectedListId} = this.state;
    return (
      <section>
        <SelectField value={connectTrello ? selectedBoardId : ''}
          disabled={!connectTrello}
          onChange={this.handleBoardChange.bind(this)}
          floatingLabelText={"Select Board"}>
          { boards.map((b)=>{
            return (<MenuItem key={b.id} value={b.id} primaryText={b.name}/>)
          })}
        </SelectField>
        <SelectField value={connectTrello ? selectedListId : ''}
          disabled={!connectTrello}
          onChange={this.handleListChange.bind(this)}
          floatingLabelText={"Select List"}>
          { lists.map((list)=>{
            return (<MenuItem key={list.id} value={list.id} primaryText={list.name}/>)
          })}
        </SelectField>
      </section>
    )
  }
}

export default Setting;
