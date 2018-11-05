import React, { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil
} from "draft-js";
import { EditorProvider } from "../context/EditorContext";

import styles from "../css/editor.module.css";

const { hasCommandModifier } = KeyBindingUtil;

function myKeyBindingFn(e) {
  if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
    return "myeditor-save";
  }
  return getDefaultKeyBinding(e);
}

export default class MinimalEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    editorPlainText: ""
  };
  onChange = this.onChange.bind(this);
  handleKeyCommand = this.handleKeyCommand.bind(this);
  focus = () => this.refs.editor.focus();

  onChange(editorState) {
    this.setState({
      editorState,
      editorPlainText: editorState.getCurrentContent().getPlainText()
    });
    this.props.handleUpdate(this.state.editorPlainText);
  }

  handleKeyCommand(command, editorState) {
    if (command === "myeditor-save") {
      // perform save here
      // set new state etc.
      alert("this will save your text as a text file.");
      return "handled";
    } else {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return "handled";
      }
      return "not-handled";
    }
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  }

  _onItalicClick() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  }

  _onUnderlineClick() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  }

  _onSaveClick() {
    let test = this.state.editorPlainText;
    console.log("from saveclick");
    console.log(test);
  }

  render() {
    const { mode = "default" } = this.props;

    // TODO: implement save and load
    // https://draftjs.org/docs/api-reference-data-conversion#docsNav

    return (
      <div className={styles.root}>
        <div className={styles.text_format}>
          <button onClick={this._onBoldClick.bind(this)}>B</button>
          <button onClick={this._onItalicClick.bind(this)}>I</button>
          <button onClick={this._onUnderlineClick.bind(this)}>U</button>
          <button onClick={this._onSaveClick.bind(this)}>S</button>
        </div>
        <div className={styles[mode]} onClick={this.focus}>
          <EditorProvider value={this.state.editorPlainText.length}>
            <Editor
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={myKeyBindingFn}
              onChange={this.onChange}
              spellCheck={true}
              stripPastedStyle={true}
              ref="editor"
            />
          </EditorProvider>
        </div>
      </div>
    );
  }
}
