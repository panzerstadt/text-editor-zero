import React, { Component } from "react";

import styles from "./css/App.module.css";
import Navbar from "./components/Navbar";
import MinimalEditor from "./pages/Editor";

class App extends Component {
  state = {
    editorRawText: ""
  };
  handleUpdate = this.handleUpdate.bind(this);

  handleUpdate(value) {
    this.setState({ editorRawText: value });
  }

  render() {
    return (
      <div className={styles.App}>
        <Navbar mode="default" editorRawText={this.state.editorRawText} />
        <MinimalEditor mode="nice" handleUpdate={this.handleUpdate} />
      </div>
    );
  }
}

export default App;
