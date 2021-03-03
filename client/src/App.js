import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import FormController from "./components/IntakeForm/FormController";
import Home from "./components/Home";
import { createMuiTheme, ThemeProvider, Button } from "@material-ui/core";
import TimesheetController from "./components/TimeSheetForm/TimesheetController";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#e6efee",
    },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { REACT_APP_TEST } = process.env;
    fetch(REACT_APP_TEST)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log("Erorr", error));
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/intakeform" component={FormController} />
            <Route exact path="/timesheet" component={TimesheetController} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
