import React, { Component, PropTypes } from 'react';
import styles from './NewCard.module.css';
import TextArea from './TextArea';

class NewCard extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {
      text: this.props.newCard.text || ''
    }
  }

  static props = {
    createNew: PropTypes.func.isRequired
  };

  handleTextChange(text){
    this.state.text = text;
  }

  handleSubmit(e){
    if(e.which !== 13) return;
    console.log('newcard submit');
    const text = e.target.value.trim();
    if(text !== ''){
      this.props.createNew({text:text, isLocal: true});
      this.state.text = '';
    } else {
      // none to done?
    }
  }

  render() {
    console.log(this.props);
    const { newCard, createNew } = this.props;
    console.log(createNew);
    return (
      <div className={styles.add_button}
           onKeyDown={this.handleSubmit.bind(this)} >
        <TextArea text={this.state.text}/>
      </div>
    );
  }
}

export default NewCard;
