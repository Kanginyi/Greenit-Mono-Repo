import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";

import store from "./Redux/Store";
import {Provider} from "react-redux";

import App from "./App";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
      <Router>
         <Provider store={store}>
            <App/>
         </Provider>
      </Router>
  </React.StrictMode>,
  document.getElementById("root")
);