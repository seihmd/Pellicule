import React, { Component, PropTypes } from 'react';
import TextArea from './TextArea'
import styles from './Card.module.css';

class Card extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      editing : false
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
      this.props.update({text, id: this.props.data.id});
      this.setState({editing: false});
    }
  }

  getText(){
    const text = this.props.data.text;
    if(this.state.editing){
      return (<TextArea text={text} onSave={(text) => { this.handleUpdate(text)} } />)
    } else {
      return text;
    }
  }

  render() {
    const { data, update, remove } = this.props;
    const textSection = this.getText();
    return (
      <div className={styles.card} onDoubleClick={this.handleDoubleClick.bind(this)}>
        <div >
          {textSection}
        </div>
        <div>
          <input type="button" onClick={this.handleRemove.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Card;
