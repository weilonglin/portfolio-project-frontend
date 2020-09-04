import React from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Homepage from "./pages/homepage";

import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Feed from "./pages/feed";
import MyProfile from "./pages/myprofile";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/feed" component={Feed} />
        <Route path="/profile" component={MyProfile} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
