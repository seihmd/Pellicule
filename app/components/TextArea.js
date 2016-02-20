import React, { Component, PropTypes } from 'react';
import styles from './TextArea.module.css';
// import classnames from 'classnames'

class TextArea extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text || ''
    }
  }

  // handleSubmit(e) {
  //   console.log(e);
  //   const text = e.target.value.trim();
  //   if (text.length === 0) return;
  //   if (e.which === 13) {
  //     console.log(this.props);
  //     this.props.createNew({text, isLocal: );
  //     e.target.value = '';
  //   }
  // }

//   handleSubmit(e) {
//   const text = e.target.value.trim()
//   if (e.which === 13) {
//     this.props.onSave(text)
//     if (this.props.newTodo) {
//       this.setState({ text: '' })
//     }
//   }
// }


  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  render() {
    const { text, createNew } = this.props;
    return (
      <textarea className={styles.textarea}
        autoFocus="false"
        value={this.state.text}
        onChange={this.handleChange.bind(this)} />
    )
  }
}

TextArea.propTypes = {
  // createNew: PropTypes.func.isRequired,
  text: PropTypes.string
}

export default TextArea
