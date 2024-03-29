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
const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
    marginLeft: "30px",
    textAlign: "left",
  },
  heads: {
    margin: theme.spacing(2),
    minWidth: 350,
    marginLeft: "30px",
    textAlign: "center",
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

class Timesheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      allWeeks: [],
      calendarLink: "",
      semester: "",
      csrfToken: "",
    };
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
        console.log(err);
      });

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
      this.props.values.email.trim() === "" ||
      this.props.values.partnerNames.trim() === "" ||
      this.props.values.week.trim() === ""
    ) {
      this.setState({ open: true });
      return;
    }
    const { REACT_APP_LOGHOURS } = process.env;
    fetch(REACT_APP_LOGHOURS, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.state.csrfToken,
      },
      body: JSON.stringify({
        firstName: this.props.values.firstName,
        lastName: this.props.values.lastName,
        email: this.props.values.email,
        partnerNames: this.props.values.partnerNames,
        hours: this.props.values.hours,
        week: this.props.values.week,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.log("Error", error));
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
          <div className={classes.elements}>
            <h1 className={classes.heads}>
              <u>LEP {this.state.semester} Weekly Timesheet</u>
            </h1>
            <h2 className={classes.heads}>
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
              placeholder="Enter Your Email"
              label="Email"
              onChange={handleChange("email")}
              defaultValue={values.email}
              margin="normal"
              required
              className={classes.formControl}
            />
            <TextField
              placeholder="Enter Your Partner(s) Names"
              label="Partner Names"
              onChange={handleChange("partnerNames")}
              defaultValue={values.partnerNames}
              margin="normal"
              required
              className={classes.formControl}
            />
            <br />
            <FormControl className={classes.formControl} required>
              <InputLabel id="hours">Hours</InputLabel>
              <Select
                labelId="hours-label"
                id="hours"
                defaultValue={values.hours}
                onChange={handleChange("hours")}
                MenuProps={MenuProps}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={0.5}>0.5</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={1.5}>1.5</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={2.5}>2.5</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={3.5}>3.5</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={4.5}>4.5</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={5}>5.5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={6.5}>6.5</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={7.5}>7.5</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={8.5}>8.5</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={9.5}>9.5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <h2 className={classes.heads}>
              Please select the week you are logging hours for:
            </h2>
            <p className={classes.heads}>
              For reference, see the SLC Academic Calendar at{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href={"https://" + this.state.calendarLink}
              >
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
          </div>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Timesheet);
