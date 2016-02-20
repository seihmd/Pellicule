import React, { Component, PropTypes } from 'react';
import TextArea from './TextArea';
import CheckList from './CheckList';
import styles from './Card.module.css';
import ClassNames from 'classnames';

class Card extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      editing : false,
      mouseOver: false,
      checkListEditing: false
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

  handleTextUpdate(text){
    if(text.length === 0){
      this.handleRemove();
    } else {
      const {id, checkList, due} = this.props.data;
      this.props.update({id,text,checkList,due});
      this.setState({editing: false});
    }
  }

  handleToggleEditCheck(){
    this.setState({checkListEditing: !this.state.checkEditing});
  }

  handleMouseEnter(e){
    e.stopPropagation();
    e.preventDefault();
    this.setState({mouseOver: true});
  }
  handleMouseLeave(e){
    e.stopPropagation();
    e.preventDefault();
    this.setState({mouseOver: false});
    setTimeout(()=>{this.setState({checkListEditing: false})}, 1000);
  }

  render() {
    const { data, update, remove, updateCheckList } = this.props;
    return (
      <div className={styles.container}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)} >
        <div className={styles.card}>
          <div className={styles.text} onDoubleClick={this.handleDoubleClick.bind(this)}>
            {this.renderText()}
          </div>
          <CheckList cardId={data.id}
            list={data.checkList}
            editing={this.state.checkListEditing}
            onSave={(cardId,list)=>{updateCheckList(cardId,list)}}/>
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
      return (<TextArea text={text} onSave={(text) => { this.handleTextUpdate(text)} } />)
    } else {
      return text;
    }
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
    // const useCheck = this.state.useCheck ? styles.useCheck : null;
    const { icon, removeIcon, checkIcon } = styles;
    return (
      <div>
        <i className={ClassNames('fa', 'fa-trash-o', icon, removeIcon)}
          onClick={this.handleRemove.bind(this)}></i>
        <i className={ClassNames('fa', 'fa-check-circle-o', icon, checkIcon)}
          onClick={this.handleToggleEditCheck.bind(this)}></i>
      </div>
    )
  }
}

export default Card;
