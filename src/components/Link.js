import React from "react";
import styles from "../css/button.module.css";

export default function(props) {
  const { mode = "default", children, ...rest } = props;
  return (
    <a href="/" className={styles[mode]} {...rest}>
      {props.text ? props.text : "button"}
    </a>
  );
}
