import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
import ClassNames from 'classnames';
import styles from './CheckList.module.css';
import IconClear from 'material-ui/lib/svg-icons/content/clear';

class CheckList extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      list: this.props.list || [],
      editing: this.props.editing || false
    };
  }

  componentWillReceiveProps(newProps){
    const {list, editing} = newProps;
    this.setState({list, editing});
    if(this.props.editing && !editing){
      this.handleUpdate();
    }
  }
  componentWillUpdate(newProps){
    let {editing, list} = newProps;
    if(editing && this.hasNoRoom(list)){
      this.handleAddList(list);
    }
  }

  excludeBlank(list){
    return list.filter( c => {return c.name !== ''});
  }

  hasNoRoom(checkList){
    return checkList.length === 0 || checkList[checkList.length-1].name !== '';
  }

  handleUpdate(){
    const blankExcludedList = this.excludeBlank(this.state.list);
    this.setState({list: blankExcludedList})
    this.props.onUpdate(this.props.cardId, this.props.checkListsId, blankExcludedList);
  }

  handleTextChange(i, e){
    const {value} = e.target;
    let checkList = this.state.list;
    checkList[i].name = value;
    this.setState({list: checkList});
  }

  handleCheckedChanged(i,e){
    const {checked} = e.target;
    let checkList = this.state.list;
    checkList[i].state = checked ? 'complete' : 'incomplete';
    this.setState({list: checkList});
    if(!this.state.editing){
      this.handleUpdate();
    }
  }

  handleKeyDown(e){
    if(e.which !== 13) return;
    this.props.onEndEdit();
  }

  handleAddList(list){
    list.push({name: '', state: 'incomplete'});
    this.setState({list});
  }

  removeCheckItem(i){
    let list = this.state.list;
    list.splice(i,1);
    this.setState({list});
  }

  render() {
    const { editing } = this.props;
    const { list } = this.state;
    return (
      <div>
        {list.map((c,i)=>{
          return (
            <span key={i}>
              {this.renderCheckbox(c,i,editing)}
            </span>
          )
        })}
      </div>
    );
  }

  renderCheckbox(checkbox,i,editing){
    if(editing){
      return (
        <div className={styles.editCheckItem}>
          <TextField
            className={styles.name}
            hintText={"checklist"}
            value={checkbox.name}
            onChange={this.handleTextChange.bind(this, i)}
            onKeyDown={this.handleKeyDown.bind(this)} />
          <span
            className={styles.removeCheckItem}
            onClick={()=>{this.removeCheckItem(i)}}>
            <IconClear/>
          </span>
        </div>
      )
    } else {
      return (
        <Checkbox
          labelStyle={{fontSize: "15px"}}
          checked={checkbox.state === 'complete'}
          onCheck={this.handleCheckedChanged.bind(this, i)}
          label={checkbox.name} />
      )
    }
  }
}

export default CheckList;
