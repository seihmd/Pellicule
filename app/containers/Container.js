import React, { Component, PropTypes } from 'react';
import NewCardContainer from './NewCard';
import CardsContainer from './Cards';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        <NewCardContainer />
        <CardsContainer />
      </div>
    );
  }
}
