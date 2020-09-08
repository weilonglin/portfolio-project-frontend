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

import { AuthProvider } from "./context/auth";
import DynamicRoute from "./dynamicRoute";

import "bootstrap/dist/css/bootstrap.css";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Container className="pt-5">
          <NavBar />
          <Switch>
            <DynamicRoute exact path="/" component={Homepage} guest />
            <DynamicRoute path="/feed" component={Feed} authenticated />
            <DynamicRoute path="/profile" component={MyProfile} authenticated />
            <DynamicRoute path="/login" component={Login} guest />
            <DynamicRoute path="/signup" component={SignupUser} guest />
            <DynamicRoute path="/add-dog" component={SignupDog} authenticated />
          </Switch>
        </Container>
      </AuthProvider>
    </div>
  );
}

export default App;
