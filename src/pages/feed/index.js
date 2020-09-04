import React from "react";
import Deck from "../../components/Feed/Deck";
import SideNav from "../../components/Feed/sideNav";

import "./index.css";

export default function index() {
  return (
    <div className="feedPage">
      <h1>FEED ME</h1>
      <Deck />
      <SideNav />
    </div>
  );
}
