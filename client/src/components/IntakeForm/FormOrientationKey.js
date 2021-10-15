import React, { Component } from "react";
import TopBar from "./TopBar.js";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import HelpIcon from "@material-ui/icons/Help";
import Tooltip from "@material-ui/core/Tooltip";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Theme comes from the theme variable in App.js
const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 350,
    marginLeft: "30px",
  },
  heads: {
    color: "black",
    textAlign: "center",
    fontSize: 50,
  },
  elements: {
    textAlign: "center",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  questionMark: { fontSize: "medium" },
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
};

const allDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

class FormOrientationKey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      semester: "",
      currOrientationKey: "",
    };
  }
  componentDidMount() {
    const { REACT_APP_INTAKERENDER } = process.env;
    fetch(REACT_APP_INTAKERENDER)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          semester: data.semester,
          currOrientationKey: data.currOrientationKey,
        });
      })
      .catch((error) => alert("Something went wrong in the backend"));
  }
  continue = (e) => {
    e.preventDefault();
    console.log(this.props.values.orientationKey.trim());
    console.log(this.state.currOrientationKey);
    if (
      this.props.values.orientationKey.trim() !== this.state.currOrientationKey
    ) {
      this.setState({ open: true });
      return;
    }
    this.props.nextStep();
  };
  handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };
  render() {
    // props is the useStyles variable
    const { values, handleChange, classes } = this.props;
    return (
      <MuiThemeProvider>
        <>
          {/* Snackbar not required right? */}
          <Snackbar
            open={this.state.open}
            autoHideDuration={5000}
            onClose={() => this.setState({ open: false })}
          >
            <Alert onClose={this.handleClose} severity="error">
              Incorrect orienataion key
            </Alert>
          </Snackbar>
          <CssBaseline />
          <TopBar />
          <br />
          <h1 className={classes.heads}>
            LEP {this.state.semester} Intake Form
          </h1>
          <br />
          <div className={classes.elements}>
            <h2 className={classes.formControl}>
              <u>
                Please Enter The Key You Receieved At Orientation Below (You
                Will Not Be Able To Continue Without The Correct Key):
              </u>
            </h2>
            <TextField
              placeholder="Orienataion Key"
              label="Enter orientation key here"
              onChange={handleChange("orientationKey")}
              defaultValue={values.orientationKey}
              margin="normal"
              required
              className={classes.formControl}
            />
            <br />
            <br />
            <ColorButton
              variant="contained"
              color="primary" // Looks like this could be secondary also without making a difference
              className={classes.margin}
              onClick={this.continue}
            >
              Next
            </ColorButton>
            <br />
          </div>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(FormOrientationKey);
