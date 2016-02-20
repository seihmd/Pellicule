import React, { Component, PropTypes } from 'react';
import TextArea from './TextArea';
import CardElm from 'material-ui/lib/card/card';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';
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
    this.editTimer = null;
  }

  static props = {
    update: PropTypes.func.isRequired,
  };

  handleRemove(){
    this.props.remove(this.props.data.id);
  }

  handleEditMode(){
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

  handleCheckListUpdate(cardId, checkList){
    this.props.updateCheckList(cardId,checkList);
    this.setState({editing: false});
  }

  handleToggleEditCheck(){
    this.setState({checkListEditing: !this.state.checkListEditing});
  }

  handleMouseEnter(e){
    e.stopPropagation();
    e.preventDefault();
    this.setState({mouseOver: true});
    clearTimeout(this.editTimer);
  }
  handleMouseLeave(e){
    e.stopPropagation();
    e.preventDefault();
    this.setState({mouseOver: false});
    this.editTimer = setTimeout(()=>{
      this.setState({editing: false});
    }, 1000);
  }

  render() {
    const { data, update, remove } = this.props;
    const cardStyle = {
      width: '300px',
      margin: '10px',
      padding: '10px'
    };

    return (
      <div className={styles.card}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}>
      <CardElm
        style={cardStyle}>
        {this.renderText()}
        {this.renderCheckList()}
      </CardElm>
      {this.renderIcons()}
      </div>
    );
  }
  renderCheckList(){
    const {data} = this.props;
    return (
      <CheckList cardId={data.id}
        list={data.checkList}
        editing={this.state.editing}
        onSave={this.handleCheckListUpdate.bind(this)}/>
    )
  }

  renderText(){
      const text = this.props.data.text;
      const cardTextStyle={
        fontSize: '18px'
      }
      if(this.state.editing){
        return (<TextArea text={text} onSave={(text) => { this.handleTextUpdate(text)} } />)
      } else {
        return (<CardText style={cardTextStyle}
                  onDoubleClick={this.handleEditMode.bind(this)}>
                  {text}
                </CardText>);
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
      if (!this.state.mouseOver || this.state.editing) return null;
      const { icon, removeIcon, checkIcon } = styles;
      return (
        <span>
          <span className={ClassNames(styles.removeButton, styles.button)}>
            <RaisedButton
              primary={true}
              onClick={this.handleRemove.bind(this)} >　　
              <i className={ClassNames('fa','fa-check-circle-o', styles.icon)}></i>
            </ RaisedButton>
          </span>
          <span className={ClassNames(styles.editButton, styles.button)}>
            <RaisedButton secondary={true}
              onClick={this.handleEditMode.bind(this)} >　　
              <i className={ClassNames('fa','fa-pencil', styles.icon)}></i>
            </ RaisedButton>
          </span>
        </span>
      )
    }
}

export default Card;
