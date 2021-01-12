import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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
const allHobbies = [
  "Sports",
  "Music/Dance",
  "Instruments",
  "Art (Knitting, Photography, Painting, etc.)",
  "Cooking/ Baking",
  "Animals",
  "Theatre/ Film",
  "Outdoor Activities",
  "Videos Games",
  "Fashion/Shopping",
];

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
  render() {
    const { values, handleChange, classes } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <TopBar />
          <br />
          <h1 className={classes.formControl}>Basic Information</h1>
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
          <br />
          <TextField
            placeholder="Enter Your Major"
            label="Major"
            onChange={handleChange("major")}
            defaultValue={values.major}
            margin="normal"
            required
            className={classes.formControl}
          />
          <FormControl
            component="fieldset"
            required
            className={classes.formControl}
          >
            <FormLabel component="legend">
              On a scale from 1-5, how important is it to get someone in your
              pair/trio with the same major?
            </FormLabel>
            <RadioGroup
              row
              aria-label="majorWeight"
              name="majorWeight1"
              defaultValue={values.majorWeight}
              onChange={handleChange("majorWeight")}
            >
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
          </FormControl>
          <br />
          <FormControl className={classes.formControl} required>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              defaultValue={values.gender}
              onChange={handleChange("gender")}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Non-Binary"}>Non-Binary</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            component="fieldset"
            required
            className={classes.formControl}
          >
            <FormLabel component="legend">
              On a scale from 1-5, how important is it to get someone in your
              pair/trio with the same gender?
            </FormLabel>
            <RadioGroup
              row
              aria-label="genderWeight"
              name="genderWeight1"
              defaultValue={values.genderWeight}
              onChange={handleChange("genderWeight")}
            >
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
          </FormControl>
          <br />
          <FormControl className={classes.formControl} required>
            <InputLabel id="hobbies-label">Select All Hobbies</InputLabel>
            <Select
              labelId="hobbies-label"
              id="hobbies"
              multiple
              value={values.hobbies}
              onChange={handleChange("hobbies")}
              input={<Input />}
              MenuProps={MenuProps}
            >
              {allHobbies.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} required>
            <InputLabel id="hobbies-label">
              Select All Available Days
            </InputLabel>
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
          <TextField
            label="What do you hope to gain from the SLC Language Exchange Program?"
            onChange={handleChange("hopeToGain")}
            defaultValue={values.hopeToGain}
            margin="normal"
            required
            fullWidth
            className={classes.formControl}
          />
          <br />
          <TextField
            label="How do you plan to maintain your motivation to meet with your partner(s) weekly?"
            onChange={handleChange("planToMeet")}
            defaultValue={values.planToMeet}
            margin="normal"
            required
            fullWidth
            className={classes.formControl}
          />
          <br />
          <br />
          <ColorButton
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={this.continue}
          >
            Next
          </ColorButton>
          <br />
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(FormUserDetails);
