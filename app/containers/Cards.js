import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Data from '../api/Data';
import Card from '../components/Card';
import * as Actions from '../actions/index';

class CardsContainer extends Component {
  componentWillMount(){
    console.log(Data);
    const {actions} = this.props;
    Data.getTrelloCards().then((cards) => {
      actions.addSomeCards(cards);
    });
  }

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
