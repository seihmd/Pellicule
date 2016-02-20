import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NewCard from '../components/NewCard';
import * as Actions from '../actions/index';

class NewCardContainer extends Component {
  render() {
    const { newCard, cards, actions } = this.props;
    return (
      <NewCard
        newCard={newCard}
        cards={cards}
        createNew={actions.createNew} />
    )
  }
}

function mapStateToProps(state) {
  return {
    newCard: state.newCard,
    cards  : state.cards,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCardContainer);
