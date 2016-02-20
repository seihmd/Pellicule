import React, { Component, PropTypes } from 'react';
import styles from './NewCard.module.css';
import TextField from 'material-ui/lib/text-field';
import Card from 'material-ui/lib/card/card';

class NewCard extends Component {
  constructor(props, context){
    super(props, context);
    this.state = {text: ''};
  }

  static props = {
    createNew: PropTypes.func.isRequired
  };

  handleTextChange(e){
    const {value} = e.target;
    this.setState({text: value});
  }

  handleSubmit(e){
    if(e.which !== 13) return;
    e.preventDefault();
    const {text} = this.state;
    if(text.length > 0){
      this.setState({text:''});
      this.props.createNew({text:text, checkList: [], due: null, isLocal: true});
    }
  }

  render() {
    return (
      <div className={styles.newCardContainer}>
      <Card className={styles.new_card} >
          <TextField
            hintText={"New Card"}
            rows={1}
            rowsMax={4}
            multiLine={true}
            value={this.state.text}
            onKeyDown={this.handleSubmit.bind(this)}
            onChange={this.handleTextChange.bind(this)} />
       </Card>
       </div>
    );
  }
}

export default NewCard;
