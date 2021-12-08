import React, { Component } from "react";
import TopBar from "../IntakeForm/TopBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
    const { REACT_APP_GET_SESSION } = process.env;
    fetch(REACT_APP_GET_SESSION, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.login === true) {
          this.setState({ isAuthenticated: true });
          this.setState({ redirect: <Redirect push to="/adminhome" /> });
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
    const { REACT_APP_CSRF } = process.env;
    fetch(REACT_APP_CSRF, {
      credentials: "include",
    })
      .then((res) => {
        this.setState({ csrfToken: res.headers.get(["X-CSRFToken"]) });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  login(d) {
    const { REACT_APP_LOGIN } = process.env;
    fetch(REACT_APP_LOGIN, {
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
        if (data.login === true) {
          this.setState({ isAuthenticated: true });
          this.setState({ redirect: <Redirect push to="/adminhome" /> });
        } else {
          this.setState({ loginError: true });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loginError: true });
      });
  }
  whoami() {
    const { REACT_APP_WHOAMI } = process.env;
    fetch(REACT_APP_WHOAMI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.state.csrfToken,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Welcome, ${data.email}!`);
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
        this.setState({ isAuthenticated: false });
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
    if (this.state.isAuthenticated) {
      return (
        <MuiThemeProvider>
          <>{this.state.redirect}</>
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
                  clientId="765830083555-tnqn5hsvb0fodkq4h5foi7tat4d335ts.apps.googleusercontent.com"
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
