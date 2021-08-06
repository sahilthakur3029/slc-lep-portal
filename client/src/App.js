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
import StudentDisplay from "./components/AdminView/StudentDisplay";
import SignIn from "./components/SignInPage/SignIn";
import Settings from "./components/AdminView/Settings";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#ffffff", //"#e6efee",
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
            <Route exact path="/studentlist" component={StudentDisplay} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/settings" component={Settings} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
