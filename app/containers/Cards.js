import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Card from '../components/Card';
import * as Actions from '../actions/index';

class CardsContainer extends Component {
  render() {
    const {cards, actions} = this.props;
    return (
      <div>
        {cards.map((d) => {
          return <Card key={d.id} data={d}
                remove={actions.removeCard}
                update={actions.updateCard} />
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cards  : state.cards
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsContainer);
