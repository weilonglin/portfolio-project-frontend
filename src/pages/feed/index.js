import React, { useState } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";

import Deck from "../../components/Feed/Deck";
import SideNav from "../../components/SideNav/sideNav";
import SignupDog from "../signupDog";

export default function Index() {
  const [window, setWindow] = useState("deck");

  function switchWindow(val) {
    setWindow(val);
  }

  const view =
    window === "deck" ? (
      <Deck />
    ) : window === "addDog" ? (
      <SignupDog switch={switchWindow} />
    ) : null;

  return (
    <React.Fragment>
      <CssBaseline />
      <SideNav switch={switchWindow} />
      {view}
    </React.Fragment>
  );
}
