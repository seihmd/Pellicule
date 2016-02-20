import React, { Component } from 'react';
import { Link } from 'react-router';
import Card from './Card';
import styles from './MainSection.module.css';

export default class MainSection extends Component {
  render() {
    console.log(this.props.cards);
    var CardNodes = this.props.cards.map((d) => {
        return (
          <Card key={d.id} data={d} />
        );
    });
    return (
      <div className={styles.main_section}>
          {CardNodes}
      </div>
    );
  }
}
