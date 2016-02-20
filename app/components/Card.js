import React, { Component, PropTypes } from 'react';
import TextArea from './TextArea';
import styles from './Card.module.css';
import ClassNames from 'classnames';

class Card extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      editing : false,
      mouseOver: false
    }
  }

  static props = {
    update: PropTypes.func.isRequired,
  };

  handleRemove(){
    this.props.remove(this.props.data.id);
  }

  handleDoubleClick(){
    this.setState({editing: true})
  }

  handleUpdate(text){
    if(text.length === 0){
      this.handleRemove();
    } else {
      const {id, checkList, due} = this.props.data;
      this.props.update({id,text,checkList,due});
      this.setState({editing: false});
    }
  }

  handleCheckedChanged(e, checkId){
    const {id, text, due, checkList} = this.props.data;
    checkList.map((c) => {
      return c.checked = c.id === checkId ? e.target.checked : c.checked;
    });
    this.props.update({id,text,checkList,due});
  }

  handleUseCheck(){
    console.log('here');
  }

  handleMouseEnter(e){
    this.setState({mouseOver: true});
  }
  handleMouseLeave(e){
    this.setState({mouseOver: false});
  }

  render() {
    const { data, update, remove } = this.props;
    return (
      <div className={styles.container}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)} >
        <div className={styles.card}>
          <div className={styles.text} onDoubleClick={this.handleDoubleClick.bind(this)}>
            {this.renderText()}
          </div>
          <div className={styles.checkList}>
            {this.renderCheckList()}
          </div>
          <div className={styles.due}>
            {this.renderDue()}
          </div>
          {this.renderIcons()}
        </div>
      </div>
    );
  }

  renderText(){
    const text = this.props.data.text;
    if(this.state.editing){
      return (<TextArea text={text} onSave={(text) => { this.handleUpdate(text)} } />)
    } else {
      return text;
    }
  }

  renderCheckList(){
    const {checkList} = this.props.data;
    return checkList.map((c) => {
      return (
        <label>
          <input type="checkbox" key={c.id}
            checked={c.checked}
            onChange={ (e) => {this.handleCheckedChanged(e, c.id)} } />
          {c.text}
          <br/>
        </label>
      )
    })
  }

  renderDue(){
    let {due} = this.props.data;
    if(!due) return;
    const time = {
      yyyy: due.slice(0,4),
      MM  : due.slice(5,7),
      dd  : due.slice(8,10),
      HH  : due.slice(11,13),
      mm  : due.slice(14,16)
    };
    let dueText = `${time.MM}/${time.dd} ${time.HH}:${time.mm}`;
    if(time.yyyy != new Date().getFullYear()){
      dueText = time.yyyy + '/' + dueText;
    }
    return (
      <div>
        {dueText}
      </div>
    )
  }

  renderIcons(){
    if (!this.state.mouseOver) return null;
    const { icon, removeIcon, checkIcon } = styles;
    return (
      <div>
        <i className={ClassNames('fa', 'fa-trash-o', icon, removeIcon)}
          onClick={this.handleRemove.bind(this)}></i>
        <i className={ClassNames('fa', 'fa-check-circle-o', icon, checkIcon)}
          onClick={this.handleUseCheck.bind(this)}></i>
      </div>
    )
  }
}

export default Card;
