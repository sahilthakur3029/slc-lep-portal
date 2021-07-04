import React, { Component } from "react";
import Home from "./AdminHome";
import { withStyles } from "@material-ui/core/styles";
import { PageButton } from "./Buttonss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TopBar from "../IntakeForm/TopBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
    marginLeft: "30px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  heads: {
    color: "black",
    textAlign: "center",
    fontSize: 40,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    boxShadow: "0 3px 5px 2px rgba(60, 75, 120, .3)",
    background: "linear-gradient(45deg, #687732 30%, #7A8B39 90%)",
    backgroundColor: "#c123de",
    borderRadius: "6px",
    border: "0",
    display: "inline-block",
    cursor: "pointer",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    padding: "6px 24px",
    textDecoration: "none",
    textShadow: "0px 1px 0px #9b14b3",
    marginLeft: "30px",
    height: 32,
    margin: theme.spacing(1),
    marginLeft: "30px",
  },
}))(Button);

class FormPairings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strictness: 2,
      redirect: null,
      csrfToken: "",
      openAlert: false,
    };
    this.runAlgorithm = this.runAlgorithm.bind(this);
  }

  componentDidMount() {
    const { REACT_APP_CSRF } = process.env;
    fetch(REACT_APP_CSRF, {
      credentials: "include",
    })
      .then((res) => {
        this.setState({ csrfToken: res.headers.get(["X-CSRFToken"]) });
      })
      .catch((err) => {
        alert(
          "Something went wrong in receiving data. Please try again later."
        );
      });
  }

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  runAlgorithm() {
    const { REACT_APP_ALGORITHM } = process.env;
    fetch(REACT_APP_ALGORITHM, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.state.csrfToken,
      },
      body: JSON.stringify({
        strictness: this.state.strictness,
      }),
    })
      .then((response) => response.json())
      .catch((error) =>
        alert("Something went wrong in pushing data. Please try again later.")
      );
    this.setState({ openAlert: true });
    return "Success;";
  }

  handleCloseOnAlert = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openAlert: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider>
        <>
          {this.state.redirect}
          <Snackbar
            open={this.state.openAlert}
            autoHideDuration={5000}
            onClose={() => this.setState({ openAlert: false })}
          >
            <Alert onClose={this.handleCloseOnAlert} severity="success">
              Algorithm Run Successful!
            </Alert>
          </Snackbar>
          <TopBar />
          <br />
          <h1 className={classes.heads}>Form New Pairs</h1>
          <h2 className={classes.formControl}>
            <u>Configurations</u>
          </h2>
          <p className={classes.formControl}>
            Please select the level of strictness for forming trios: 1 for
            strict, 2 for medium, or 3 for loose:
          </p>
          <FormControl className={classes.formControl} required>
            <InputLabel id="strictness-label">Algorithm Strictness</InputLabel>
            <Select
              labelId="strictness-label"
              id="strictness"
              defaultValue={this.state.strictness}
              value={this.state.strictness ? this.state.strictness : 2}
              onChange={this.handleChange("strictness")}
            >
              <MenuItem value={1}>1 - Strict</MenuItem>
              <MenuItem value={2}>2 - Medium</MenuItem>
              <MenuItem value={3}>3 - Loose</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ColorButton
              variant="contained"
              color="primary"
              className={classes.margin}
              onClick={() =>
                this.setState({ redirect: <Redirect push to="/adminhome" /> })
              }
            >
              Back
            </ColorButton>
            <ColorButton
              variant="contained"
              color="primary"
              className={classes.margin}
              onClick={this.runAlgorithm}
            >
              Run Algorithm
            </ColorButton>
            <br />
          </div>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(FormPairings);
