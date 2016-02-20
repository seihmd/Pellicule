import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainSection from '../components/MainSection';
import * as CardsActions from '../actions/cards';

function mapStateToProps(state) {
  return {
    cards: state.cards
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CardsActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MainSection);
