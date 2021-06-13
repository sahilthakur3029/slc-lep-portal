import React, { Component } from "react";
import TopBar from "../IntakeForm/TopBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GoogleButton from "react-google-button";

import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Student Learning Center
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csrfToken: "",
      isAuthenticated: false,
      loginError: false,
      redirect: null,
    };
    this.csrf = this.csrf.bind(this);
    this.login = this.login.bind(this);
    this.whoami = this.whoami.bind(this);
    this.logout = this.logout.bind(this);
    this.loginFailure = this.loginFailure.bind(this);
  }

  componentDidMount() {
    console.log("Mounted");
    fetch("http://localhost:5000/api/getsession", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.login == true) {
          this.setState({ isAuthenticated: true });
        } else {
          this.setState({ isAuthenticated: false });
          this.csrf();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  csrf() {
    console.log("csrf called");
    fetch("http://localhost:5000/api/getcsrf", {
      credentials: "include",
    })
      .then((res) => {
        console.log(res.headers.get(["X-CSRFToken"]));
        this.setState({ csrfToken: res.headers.get(["X-CSRFToken"]) });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  login(d) {
    console.log(this.state.csrfToken);
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/json",
        "X-CSRFToken": this.state.csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({
        id_token: d.tokenObj.id_token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.login == true) {
          this.setState({ isAuthenticated: true });
        } else {
          console.log("ERROR");
          this.setState({ loginError: true });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loginError: true });
      });
  }
  whoami() {
    fetch("http://localhost:5000/api/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.state.csrfToken,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert(`Welcome, ${data.email}!`);
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
        this.setState({ isAuthenticated: false });
        this.setState({ redirect: <Redirect push to="/adminhome" /> });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  loginFailure() {
    this.setState({ loginError: true });
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.loginError);
    if (this.state.isAuthenticated) {
      return (
        <MuiThemeProvider>
          <>
            <TopBar />
            <h1>You are authenticated!</h1>
            <Button onClick={this.whoami} variant="contained">
              whoami
            </Button>
            <Button onClick={this.logout} variant="contained">
              logout
            </Button>
          </>
        </MuiThemeProvider>
      );
    } else {
      return (
        <MuiThemeProvider>
          <>
            <TopBar />
            {this.state.redirect}
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  SLC Admin Sign In
                </Typography>
                <br />
                <br />
                <GoogleLogin
                  clientId="400000931739-oqett115tft12ja9u5lehnimqu87bebd.apps.googleusercontent.com"
                  buttonText="Log in with Google"
                  onSuccess={this.login}
                  onFailure={this.loginFailure}
                  g
                  cookiePolicy={"single_host_origin"}
                  redirectUri="postmessage"
                  scope="openid"
                />
                <Snackbar
                  open={this.state.loginError}
                  autoHideDuration={10000}
                  onClose={() => this.setState({ loginError: false })}
                >
                  <Alert elevation={6} severity="error" variant="filled">
                    Error logging in
                  </Alert>
                </Snackbar>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
          </>
        </MuiThemeProvider>
      );
    }
  }
}

export default withStyles(useStyles)(SignIn);
