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

  handleUpdate(){
    this.props.onSave(this.props.cardId, this.state.list);
  }

  handleTextChange(i, e){
    const {value} = e.target;
    let checkList = this.state.list;
    checkList[i].text = value;
    this.setState({list: checkList.filter((c)=>{return c.text !== ''})});
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

  render() {
    const { list } = this.props;
    if(this.state.editing && list.length === 0){
      list.push({text: '', checked: false});
    }
    return (
      <div>
        {list.map((c,i)=>{
          return (<div key={i}>{this.renderCheckList(c,i)}</div>)
        })}
      </div>
    );
  }

  renderCheckList(c,i){
    return (
      <label>
        <input type="checkbox" idx={i}
          checked={c.checked}
          onChange={this.handleCheckedChanged.bind(this, i)} />
        {this.renderText(c.text,i)}
      </label>
    )
  }

  renderText(text,i){
    if(this.props.editing){
      return (
        <input type="text" value={text} idx={i}
          onChange={this.handleTextChange.bind(this, i)}
          onKeyDown={this.handleKeyDown.bind(this, i)}/>
        )
    } else {
      return text;
    }
  }
}

export default CheckList;
