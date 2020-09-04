import React from "react";
import { Switch, Route } from "react-router-dom";
import { render } from "react-dom";
import NavBar from "./components/NavBar/NavBar";
import Homepage from "./pages/homepage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
