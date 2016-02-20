import React, { Component, PropTypes } from 'react';
import styles from './NewCard.module.css';
import TextArea from './TextArea';

class NewCard extends Component {
  constructor(props, context){
    super(props, context);
  }

  static props = {
    createNew: PropTypes.func.isRequired
  };

  handleTextChange(text){
    this.state.text = text;
  }

  handleSubmit(text){
    if(text.length > 0){
      this.props.createNew({text:text, isLocal: true});
    }
  }

  render() {
    return (
      <div className={styles.add_button} >
        <TextArea onSave={(text)=>{this.handleSubmit(text)}} />
      </div>
    );
  }
}

export default NewCard;
