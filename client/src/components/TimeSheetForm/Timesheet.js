import React, { Component } from "react";
import TopBar from "../IntakeForm/TopBar";
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
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const key = "iloveslc";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
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
      backgroundColor: "#859438",
    },
    margin: theme.spacing(1),
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

class Timesheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }
  continue = (e) => {
    // e.preventDefault();
    // if (this.props.values.orientationKey.trim() != key) {
    //   this.setState({ open: true });
    //   return;
    // }
    // this.props.nextStep();
  };
  handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };
  render() {
    const { values, handleChange, classes } = this.props;
    return (
      <MuiThemeProvider>
        <>
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
          <h1 className={classes.formControl}>
            <u>LEP Intake Form</u>
          </h1>
          <br />
          <h2 className={classes.formControl}>Basic Information</h2>
          <TextField
            placeholder="Enter Your First Name"
            label="First Name"
            onChange={handleChange("firstName")}
            defaultValue={values.firstName}
            margin="normal"
            required
            className={classes.formControl}
          />
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Timesheet);
