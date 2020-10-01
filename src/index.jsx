import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";

import App from "./App";
const Routing = (
  <Router>
    <div>
      <Route path="/" component={App} />
    </div>
  </Router>
);
ReactDOM.render(Routing, document.querySelector("#shell"));
