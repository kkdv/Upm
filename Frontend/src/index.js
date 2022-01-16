import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./containers/App.jsx";
import store from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import * as fn from "./components/Helpers/Helper";

//import { ThemeProvider, createMuiTheme } from "@material-ui/core";
//import { ThemeSwitch } from "./components/MainPage/ThemeSwitch";
//import { dark, light } from "./components/MainPage/muiTheme";

fn.pa("Home Page Visit");

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
