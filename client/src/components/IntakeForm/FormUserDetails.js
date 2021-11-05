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

// Theme comes from the theme variable in App.js
const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(2),
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

class FormUserDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    // props is the useStyles variable
    const { values, handleChange, classes } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <TopBar />
          <br />
          <div className={classes.elements}>
            <h1 className={classes.heads}>
              <u>Basic Information</u>
            </h1>
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
            <TextField
              placeholder="Enter Your Email"
              label="Email"
              onChange={handleChange("email")}
              defaultValue={values.email}
              margin="normal"
              required
              className={classes.formControl}
            />
            <br />
            <FormControl className={classes.formControl} required>
              <InputLabel id="academic-title-label">Academic Title</InputLabel>
              <Select
                labelId="academic-title-label"
                id="academic-title"
                defaultValue={values.academicTitle}
                onChange={handleChange("academicTitle")}
              >
                <MenuItem value={"Undergraduate"}>Undergraduate</MenuItem>
                <MenuItem value={"Graduate"}>Graduate</MenuItem>
                <MenuItem value={"Staff"}>Staff</MenuItem>
                <MenuItem value={"Scholar"}>Scholar</MenuItem>
                <MenuItem value={"Alumnus"}>Alumnus</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} required>
              <InputLabel id="residency-label">Residency</InputLabel>
              <Select
                labelId="residency-label"
                id="residency"
                defaultValue={values.residency}
                onChange={handleChange("residency")}
              >
                <MenuItem value={"Domestic US"}>Domestic US</MenuItem>
                <MenuItem value={"International"}>International</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="Enter Your Major(s)"
              label="Major(s) - If multiple, seperate with commas"
              onChange={handleChange("major")}
              defaultValue={values.major}
              margin="normal"
              className={classes.formControl}
            />
            <br />
            <Tooltip
              title="We use the following information for the purposes of helping our staff use the most 
          respectful language when addressing you and giving you the option, as seen later in this form, 
          of preferring a partner with a particular gender."
              placement="top"
            >
              <FormControl className={classes.formControl}>
                <InputLabel id="gender-label">
                  Gender <HelpIcon className={classes.questionMark}></HelpIcon>
                </InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  defaultValue={values.gender}
                  onChange={handleChange("gender")}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"TransMale"}>TransMale</MenuItem>
                  <MenuItem value={"TransFemale"}>TransFemale</MenuItem>
                  <MenuItem value={"Genderqueer"}>Genderqueer</MenuItem>
                  <MenuItem value={"Prefer Not To State"}>
                    Prefer Not To State
                  </MenuItem>
                  <MenuItem value={"Custom"}>Custom</MenuItem>
                </Select>
              </FormControl>
            </Tooltip>
            <TextField
              placeholder="Gender Custom"
              label="If Custom, please specify"
              onChange={handleChange("genderCustom")}
              defaultValue={values.genderCustom}
              margin="normal"
              className={classes.formControl}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="days-label">Select All Available Days</InputLabel>
              <Select
                labelId="dow-label"
                id="dow"
                multiple
                value={values.availability}
                onChange={handleChange("availability")}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {allDays.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <br />
            <TextField
              style={{
                margin: 0,
                width: "75%",
              }}
              label="What do you hope to gain from the SLC Language Exchange Program?"
              onChange={handleChange("hopeToGain")}
              defaultValue={values.hopeToGain}
              margin="normal"
              required
              className={classes.formControl}
            />
            <br />
            <br />
            <TextField
              style={{
                margin: 0,
                width: "75%",
              }}
              label="How do you plan to maintain your motivation to meet with your partner(s) weekly?"
              onChange={handleChange("planToMeet")}
              defaultValue={values.planToMeet}
              margin="normal"
              required
              className={classes.formControl}
            />
            <br />
            <br />
            <ColorButton
              variant="contained"
              color="primary"
              className={classes.margin}
              onClick={this.back}
            >
              Back
            </ColorButton>
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

export default withStyles(useStyles)(FormUserDetails);
