import React, { Component } from "react";
import TopBar from "../IntakeForm/TopBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import CssBaseline from "@material-ui/core/CssBaseline";
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
  heads: {
    color: "black",
    textAlign: "center",
    fontSize: 40,
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

class Timesheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      allWeeks: [],
      calendarLink: "",
      semester: "",
    };
  }
  componentDidMount() {
    const { REACT_APP_TSRENDER } = process.env;
    fetch(REACT_APP_TSRENDER)
      .then((response) => response.json())
      .then((data) => {
        let insertWeekPrefix = [];
        for (let i = 0; i < data.allWeeks.length; i++) {
          insertWeekPrefix.push(`Week ${data.allWeeks[i]}`);
        }
        this.setState({
          calendarLink: data.calendarLink,
          semester: data.semester,
          allWeeks: insertWeekPrefix,
        });
      })
      .catch((error) => console.log("Error", error));
  }

  continue = (e) => {
    e.preventDefault();
    if (
      this.props.values.firstName.trim() === "" ||
      this.props.values.lastName.trim() === "" ||
      this.props.values.sid.trim() === "" ||
      this.props.values.partnerNames.trim() === "" ||
      this.props.values.week.trim() === "" ||
      this.props.values.hours.trim() === ""
    ) {
      this.setState({ open: true });
      return;
    }
    // PROCESS FORM! //
    let data = JSON.stringify({
      firstName: this.props.values.firstName,
      lastName: this.props.values.lastName,
      sid: this.props.values.sid,
      partnerNames: this.props.values.partnerNames,
      hours: this.props.values.hours,
      week: this.props.values.week,
    });
    console.log(data);
    this.props.nextStep();
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
              Please fill in all the fields.
            </Alert>
          </Snackbar>
          <CssBaseline />
          <TopBar />
          <br />
          <h1 className={classes.heads}>
            {this.state.semester} LEP Weekly Timesheet
          </h1>
          <h2 className={classes.formControl}>
            Please submit your weekly hours every Sunday by 5PM PST
          </h2>
          <TextField
            placeholder="Enter Your First Name"
            label="First Name"
            onChange={handleChange("firstName")}
            defaultValue={values.firstName}
            margin="normal"
            required
            className={classes.formControl}
          />
          <TextField
            placeholder="Enter Your Last Name"
            label="Last Name"
            onChange={handleChange("lastName")}
            defaultValue={values.lastName}
            margin="normal"
            required
            className={classes.formControl}
          />
          <br />
          <TextField
            placeholder="Enter Your Student ID Number"
            label="SID"
            onChange={handleChange("sid")}
            defaultValue={values.sid}
            margin="normal"
            required
            className={classes.formControl}
          />
          <br />
          <TextField
            placeholder="Enter Your Partner(s) Names"
            label="Partner Names"
            onChange={handleChange("partnerNames")}
            defaultValue={values.sid}
            margin="normal"
            required
            className={classes.formControl}
          />
          <br />
          <TextField
            placeholder="How many hours did you meet?"
            label="Hours"
            onChange={handleChange("hours")}
            defaultValue={values.hours}
            margin="normal"
            required
            className={classes.formControl}
          />
          <br />
          <br />
          <h2 className={classes.formControl}>
            Please select the week you are logging hours for:
          </h2>
          <p className={classes.formControl}>
            For reference, see the SLC Academic Calendar at{" "}
            <a target="_blank" href={"https://" + this.state.calendarLink}>
              {this.state.calendarLink}
            </a>
            .
          </p>
          <FormControl className={classes.formControl} required>
            <InputLabel id="week-label">Choose Week</InputLabel>
            <Select
              labelId="week-label"
              id="week-title"
              defaultValue=""
              onChange={handleChange("week")}
            >
              {this.state.allWeeks.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <br />
          <ColorButton
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={this.continue}
          >
            Confirm & Continue
          </ColorButton>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Timesheet);
