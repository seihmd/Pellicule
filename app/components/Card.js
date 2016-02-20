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

  render() {
    console.log(this.props);
    const { data } = this.props;
    return (
      <div className={styles.card}>
        {data.text}
      </div>
    );
  }
}

export default Card;
