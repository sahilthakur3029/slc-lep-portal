import React, { Component } from "react";
import TopBar from "./TopBar.js";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
    marginLeft: "30px",
  },
  elements: {
    textAlign: "center",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class Success extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <TopBar />
          <div className={classes.elements}>
            <br />
            <h1 className={classes.formControl}>
              Thank You For Filling Out The Intake Form!
            </h1>
            <p className={classes.formControl}>
              You will recieve an email once a match has been found. You may
              safely close this window.
            </p>
          </div>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Success);
