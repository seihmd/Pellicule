import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';

class CheckList extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      list: this.props.list || [],
      editing: this.props.editing || false
    };
    this.checkLabelStyle ={
      fontSize: '15px'
    }
    this.checkTextStyle={
      width: '235px',
      fontSize: '15px',
      margin: '0 20px',
      marginTop:'0',
      marginBottom:'0',
      height: '30px',
      verticalAlign:'-webkit-baseline-middle'
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
    let {editing, list} = newProps;
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

  handleKeyDown(e){
    if(e.which !== 13) return;
    this.handleUpdate();
  }

  handleAddList(list){
    list.push({text: '', checked: false});
    this.setState({list});
  }

  render() {
    const { editing } = this.props;
    const { list } = this.state;
    // if(!list) return null;
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
        <TextField
          style={this.checkTextStyle}
          hintText={"checklist"}
          value={checkbox.text}
          onChange={this.handleTextChange.bind(this, i)}
          onKeyDown={this.handleKeyDown.bind(this)} />
      )
    } else {
      return (
        <Checkbox
          labelStyle={this.checkLabelStyle}
          checked={checkbox.checked}
          onCheck={this.handleCheckedChanged.bind(this, i)}
          label={checkbox.text} />
      )
    }
  }
}

export default CheckList;
