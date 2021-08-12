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

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 350,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  heads: {
    color: "black",
    textAlign: "center",
    fontSize: 35,
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
    fetch("http://localhost:5000/api/getsession", {
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
    fetch("http://localhost:5000/api/logout", {
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
          <div className={classes.formControl}>

          {this.state.redirect}
          <h1 className={classes.heads}>Home</h1>
          <p className={classes.heads}>Welcome to the SLC</p>
          <Button
            className={classes.buttonRoot} style={{position: "absolute", left: 400, top:1000}}
            onClick={() =>
              this.setState({ redirect: <Redirect push to="/unpaired" /> })
            }
          >
            Unpaired
          </Button>
          <Button
            className={classes.buttonRoot} style={{position: "absolute", right:400, top:1000}}
            onClick={() =>
              this.setState({ redirect: <Redirect push to="/paired" /> })
            }
          >
            Paired
          </Button>
          <Button
            className={classes.buttonRoot} style={{position: "absolute", left: 400, top:1100}}
            onClick={() =>
              this.setState({ redirect: <Redirect push to="/formpairs" /> })
            }
          >
            Form new pairs
          </Button>
          <Button className={classes.buttonRoot} style={{position: "absolute", right: 400, top:1100}} onClick={this.logout}>
            Logout
          </Button>
          </div>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Home);
