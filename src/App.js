import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar/NavBar";
import Homepage from "./pages/homepage";

import Login from "./pages/login";
import SignupUser from "./pages/signupUser";
import SignupDog from "./pages/signupDog";
import Feed from "./pages/feed";
import MyProfile from "./pages/myprofile";
import Chat from "./pages/details";
import { AuthProvider } from "./context/auth";
import DynamicRoute from "./dynamicRoute";
import { Grid } from "@material-ui/core";

function App() {
  return (
    <Grid container direction="column">
      <AuthProvider>
        <Container className="pt-5">
          <NavBar />
          <Switch>
            <DynamicRoute exact path="/" component={Homepage} guest />
            <DynamicRoute path="/feed" component={Feed} authenticated />
            <DynamicRoute path="/profile" component={MyProfile} authenticated />
            <DynamicRoute path="/login" component={Login} guest />
            <DynamicRoute path="/chat" component={Chat} />
            <DynamicRoute path="/signup" component={SignupUser} guest />
            <DynamicRoute path="/add-dog" component={SignupDog} authenticated />
          </Switch>
        </Container>
      </AuthProvider>
    </Grid>
  );
}

export default App;
