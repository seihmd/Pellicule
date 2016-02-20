import React, { Component, PropTypes } from 'react';
import TextArea from './TextArea'
import styles from './Card.module.css';

class Card extends Component {
  static props = {
    text: PropTypes.string.isRequired,
  };

  handleSave(){
    if (text.length === 0) {
      this.props.cancel(id)
    } else {
      this.props.update(id, text)
    }
    this.setState({editing: false})
  }

  handleRemove(){
    this.props.remove(this.props.data.id);
  }

  render() {
    const { data, update, remove } = this.props;
    return (
      <div className={styles.card}>
        <div>
          {data.text}
        </div>
        <div>
          <input type="button" onClick={this.handleRemove.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Card;
