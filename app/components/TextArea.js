import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import styles from './TextArea.module.css';

class TextArea extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text || ''
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
    const hintText = this.props.hintText || '';
    return (
      <div className={styles.textarea}>
        <TextField
          hintText={hintText}
          rows={1}
          rowsMax={4}
          multiLine={true}
          autoFocus="false"
          value={this.state.text}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleSubmit.bind(this)}/>
      </div>
    )
  }
}

TextArea.propTypes = {
  text: PropTypes.string
}

export default TextArea
