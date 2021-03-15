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

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#e6efee",
    },
  },
});

class App extends React.Component {
  render() {
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
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
