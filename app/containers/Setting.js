import React, { Component, PropTypes } from 'react';

export default class Setting extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        Yeah!
      </div>
    );
  }
}
