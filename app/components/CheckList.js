import React, { Component, PropTypes } from 'react';
import styles from './CheckList.module.css';
import ClassNames from 'classnames';

class CheckList extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      list: this.props.list || [],
      editing: this.props.editing || false
    }
  }
  static props = {
    onSave: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(newProps){
    const {list, editing} = newProps;
    this.setState({list, editing});
    if(this.props.editing && !editing){
      this.handleUpdate();
    }
  }
  componentWillUpdate(newProps){
    const {editing, list} = newProps;
    if(editing && this.hasNoRoom(list)){
      this.handleAddList(list);
    }
  }

  excludeBlank(list){
    return list.filter( c => {return c.text !== ''});
  }

  hasNoRoom(checkList){
    return checkList.length === 0 || checkList[checkList.length-1].text !== '';
  }

  handleUpdate(){
    const blankExcludedList = this.excludeBlank(this.state.list);
    this.setState({list: blankExcludedList})
    this.props.onSave(this.props.cardId, blankExcludedList);
  }

  handleTextChange(i, e){
    const {value} = e.target;
    let checkList = this.state.list;
    checkList[i].text = value;
    this.setState({list: checkList});
  }

  handleCheckedChanged(i,e){
    const {checked} = e.target;
    let checkList = this.state.list;
    checkList[i].checked = checked;
    this.setState({list: checkList});
    if(!this.state.editing){
      this.handleUpdate();
    }
  }

  handleKeyDown(i,e){
    // TODO Should TAB key accepted?
    if(e.which !== 13) return;
    let {list} = this.state;
    if(list.length-1 === i){
      list.push({text: '', checked:false});
      this.setState({list});
    }
  }

  handleAddList(list){
    list.push({text: '', checked: false});
    this.setState({list});
  }

  render() {
    const { editing } = this.props;
    const { list } = this.state;
    return (
      <div>
        {list.map((c,i)=>{
          return (
            <div key={i}>
              {this.renderCheckList(c.checked,i,editing)}
              {this.renderText(c.text,i,editing)}
            </div>
          )
        })}
      </div>
    );
  }

  renderCheckList(checked,i,editing){
    if(!editing){
      return (
        <label>
          <input type="checkbox" idx={i}
            checked={checked}
            onChange={this.handleCheckedChanged.bind(this, i)} />
        </label>
      )
    }
  }

  renderText(text,i,editing){
    if(editing){
      return (
        <input type="text" value={text} idx={i}
          onChange={this.handleTextChange.bind(this, i)} />
        )
    } else {
      return text;
    }
  }
}

export default CheckList;
