import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
import styles from './Card.module.css';

class Card extends Component {
  static props = {
    remove: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    const { remove, edit, text } = this.props;
    return (
      <div className={styles.card}>
        {this.props.data.text}
      </div>
    );
  }
}

export default Card;
