import React, { Component, PropTypes } from 'react';
import styles from './TextArea.module.css';
// import classnames from 'classnames'

class TextArea extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: ''
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleSubmit (e) {
    if (e.which !== 13) {
      return;
    } else {
      e.preventDefault();
      const text = e.target.value.trim();
      if (text.length > 0) {
        this.props.onSave(text);
        this.setState({text: ''});
      }
    }
  }

  render() {
    const { text, createNew } = this.props;
    return (
      <textarea className={styles.textarea}
        autoFocus="false"
        value={this.state.text}
        onChange={this.handleChange.bind(this)}
        onKeyDown = {this.handleSubmit.bind(this)}/>
    )
  }
}

TextArea.propTypes = {
  text: PropTypes.string
}

export default TextArea
