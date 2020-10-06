import React from "react";
import heart from "../../img/heart.png";
import rewind from "../../img/rewind.png";
import dislike from "../../img/dislike.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  icon: {
    position: "absolute",
    bottom: 30,
    textAlign: "center",
  },
}));

export default function Buttons(props) {
  const styles = useStyles();
  return (
    <div className={styles.icon}>
      {" "}
      <div>
        <img src={dislike} width="50px" height="50px" />
        <img src={heart} width="50px" height="50px" />
      </div>
      <div>{props.dir}</div>
    </div>
  );
}
