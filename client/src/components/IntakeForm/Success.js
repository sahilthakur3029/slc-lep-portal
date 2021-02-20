import React, { Component } from "react";
import TopBar from "./TopBar.js";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#859438"),
    backgroundColor: "#859438",
    "&:hover": {
      backgroundColor: "#859438",
    },
    margin: theme.spacing(1),
  },
}))(Button);

class Success extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
    };
  }

  goHome = (e) => {
    e.preventDefault();
    // Redirect home
    this.setState({ redirect: <Redirect push to="/" /> });
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider>
        <>
          {this.state.redirect}
          <TopBar />
          <br />
          <h1 className={classes.formControl}>
            Thank You For Filling Out The Intake Form
          </h1>
          <p className={classes.formControl}>
            Please Click Below To Navigate Back To The Home Page.
          </p>
          <br />
          <ColorButton
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={this.goHome}
          >
            Home
          </ColorButton>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Success);
