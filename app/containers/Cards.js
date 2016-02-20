import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Card from '../components/Card';
import * as actions from '../actions/index.js';

class CardsContainer extends Component {
  render() {
    const {cards} = this.props;
    return (
      <div>
        {cards.map((d) => {
          return <Card key={d.id} data={d} />
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
  return bindActionCreators({actions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsContainer);
