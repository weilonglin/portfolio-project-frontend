import React from "react";

import Deck from "../../components/Homepage/Deck";
import Signup from "../signupUser/index";
import { Grid } from "@material-ui/core";

export default function Homepage(props) {
  return (
    <Grid container direction="column">
      <Grid item xs={2} />
      <Grid item xs={8}>
        <h1>Match. Chat. Date</h1>

        <h3>Discover</h3>

        <Deck />

        <button>Sign up</button>

        <button>Log in </button>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
}
