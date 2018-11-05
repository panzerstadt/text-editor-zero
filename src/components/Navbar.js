import React, { Component } from "react";
import moment from "moment";
import logo, { ReactComponent as ReactLogo } from "../logo.svg";
import styles from "../css/navbar.module.css";

import { EditorConsumer } from "../context/EditorContext";

import Link from "./Link";
import Button from "./Button";

export default class Navbar extends Component {
  state = {
    editorContent: {}
  };

  render() {
    const { mode = "default" } = this.props;

    const _downloadFile = v => {
      // https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react
      if (v.length > 0) {
        alert("this will save the text as a plain .txt file: " + v);
        let hiddenElement = document.createElement("a");
        let file = new Blob([v], { type: "text/plain" });
        hiddenElement.href = URL.createObjectURL(file);
        hiddenElement.download = moment().format("YYYYMMDD") + "_note.txt";
        hiddenElement.click();
      }
    };

    return (
      <header className={[styles.navbar, styles[mode]].join(" ")}>
        <ReactLogo className={styles.app_logo} alt="logo" />

        <div className={styles.button}>
          <Button
            mode="flipped"
            text="save"
            onClick={() => _downloadFile(this.props.editorRawText)}
          />
          <Link mode="warning" text="new" />
        </div>
      </header>
    );
  }
}
