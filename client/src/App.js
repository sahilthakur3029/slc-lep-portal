import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import FormController from "./components/IntakeForm/FormController";
import Home from "./components/Home";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import TimesheetController from "./components/TimesheetForm/TimesheetController";
import AdminHome from "./components/AdminView/AdminHome";
import Paired from "./components/AdminView/Paired";
import Unpaired from "./components/AdminView/Unpaired";
import FormPairings from "./components/AdminView/FormPairings";
import SignIn from "./components/SignInPage/SignIn";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#ffffff", //"#e6efee",
    },
  },
});

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/intakeform" component={FormController} />
          <Route exact path="/timesheet" component={TimesheetController} />
          <Route exact path="/adminhome" component={AdminHome} />
          <Route exact path="/paired" component={Paired} />
          <Route exact path="/unpaired" component={Unpaired} />
          <Route exact path="/formpairs" component={FormPairings} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
