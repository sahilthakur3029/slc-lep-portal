import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

export class Success extends Component {
  continue = (e) => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <MuiThemeProvider>
        <>
          <AppBar title="Success" />
          <h1>Thank You For Filling Out The Intake Form</h1>
          <p>Please Click Below To Navigate Back To The Home Page.</p>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Success;
