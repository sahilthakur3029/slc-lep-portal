import React, { Component } from "react";
import Paired from "./Paired";
// import Button from "./Paired";
import Button from "@material-ui/core/Button";
import Unpaired from "./Unpaired";
import FormPairings from "./FormPairings";
import { makeStyles } from "@material-ui/core/styles";
import { PageButton } from "./Buttonss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TopBar from "../IntakeForm/TopBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  buttonRoot: {
    background: "linear-gradient(45deg, #687732 30%, #7A8B39 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(60, 75, 120, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { redirect: null, isAuthenticated: false };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const { REACT_APP_GET_SESSION } = process.env;
    fetch(REACT_APP_GET_SESSION, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.login == true) {
          this.setState({ isAuthenticated: true });
        } else {
          this.setState({ redirect: <Redirect push to="/signin" /> });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout(d) {
    const { REACT_APP_LOGOUT } = process.env;
    fetch(REACT_APP_LOGOUT, {
      credentials: "include",
    })
      .then(() => {
        this.setState({ redirect: <Redirect push to="/signin" /> });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <TopBar />
          {this.state.redirect}
          <h1>Home</h1>
          <p>Welcome to the SLC</p>
          <Button
            className={classes.buttonRoot}
            onClick={() =>
              this.setState({ redirect: <Redirect push to="/unpaired" /> })
            }
          >
            Unpaired
          </Button>
          <Button
            className={classes.buttonRoot}
            onClick={() =>
              this.setState({ redirect: <Redirect push to="/paired" /> })
            }
          >
            Paired
          </Button>
          <Button
            className={classes.buttonRoot}
            onClick={() =>
              this.setState({ redirect: <Redirect push to="/formpairs" /> })
            }
          >
            Form new pairs
          </Button>
          <Button className={classes.buttonRoot} onClick={this.logout}>
            Logout <ExitToAppIcon />
          </Button>
          <Button
            className={classes.buttonRoot}
            onClick={() =>
              this.setState({ redirect: <Redirect push to="/settings" /> })
            }
          >
            Settings <SettingsIcon />
          </Button>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Home);
