import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
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
    color: theme.palette.getContrastText("#859438"),
    backgroundColor: "#859438",
    "&:hover": {
      backgroundColor: "#848438",
    },
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
      isAuthenticated: false,
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
        this.setState({ redirect: <Redirect push to="/signin" /> });
      });
    const { REACT_APP_GET_SESSION } = process.env;
    fetch(REACT_APP_GET_SESSION, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.login === true) {
          this.setState({ isAuthenticated: true });
        } else {
          this.setState({ redirect: <Redirect push to="/signin" /> });
        }
      })
      .catch((err) => {
        this.setState({ redirect: <Redirect push to="/signin" /> });
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
      .then((data) => {
        if (data.success === true) {
          this.setState({ openAlert: true });
          return "Success";
        } else {
          this.setState({ redirect: <Redirect push to="/signin" /> });
        }
      })
      .catch((error) =>
        alert("Something went horribly wrong. Please try again later.")
      );
    return "Failed";
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
            Please select the level of strictness for forming trios:{" "}
            <b>1 for strict</b> -{" "}
            <em>
              third person must match the exchange profile of someone in the
              pair
            </em>
            , <b>2 for medium</b> -{" "}
            <em>
              third person should have exchange language levels ±1 compared to
              pairs; <u>preferred</u>
            </em>
            , or <b>3 for loose</b> -{" "}
            <em>third person just has to match exchange profile of pair</em>:
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
