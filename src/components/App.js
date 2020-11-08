import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MainPage from "./MainPage";
import Redis from "./Redis";
import "./style.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/:md5" exact component={Redis} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
