import React from "react";

import Deck from "../../components/Homepage/Deck";
import Signup from "../signupUser/index";

export default function Homepage(props) {
  return (
    <div>
      <h1>Match. Chat. Date</h1>
      <h3>Discover</h3>
      <Deck />
      <button>Sign up</button>
      <button>Log in </button>
    </div>
  );
}
