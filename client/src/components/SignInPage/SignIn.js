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
      username: "",
      password: "",
      csrfToken: "",
      isAuthenticated: false,
    };
    this.csrf = this.csrf.bind(this);
    this.login = this.login.bind(this);
    this.whoami = this.whoami.bind(this);
    this.logout = this.logout.bind(this);
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

  login() {
    console.log(this.state.username);
    console.log(this.state.password);
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
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.login == true) {
          this.setState({ isAuthenticated: true });
        }
      })
      .catch((err) => {
        console.log(err);
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
        alert(`Welcome, ${data.username}!`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  logout() {
    fetch("http://localhost:5000/api/logout", {
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

  render() {
    const { classes } = this.props;
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
            <h1>Log in</h1>
            <TextField
              placeholder="Username"
              label="username"
              onChange={this.handleChange("username")}
              defaultValue={this.state.username}
              margin="normal"
            />
            <TextField
              placeholder="Password"
              label="password"
              onChange={this.handleChange("password")}
              defaultValue={this.state.password}
              margin="normal"
            />
            <Button onClick={this.login} variant="contained">
              login
            </Button>
          </>
        </MuiThemeProvider>
      );
    }
  }
}

export default withStyles(useStyles)(SignIn);
