import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar/NavBar";
import Homepage from "./pages/homepage";

import "./App.css";
import Login from "./pages/login";
import SignupUser from "./pages/signupUser";
import SignupDog from "./pages/signupDog";
import Feed from "./pages/feed";
import MyProfile from "./pages/myprofile";

import "bootstrap/dist/css/bootstrap.css";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Container className="pt-5">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/feed" component={Feed} />
          <Route path="/profile" component={MyProfile} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignupUser} />
          <Route path="/add-dog" component={SignupDog} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
