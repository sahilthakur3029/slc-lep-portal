import React, { Component } from "react";
import TopBar from "./TopBar.js";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

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
  formControlSmall: {
    marginLeft: "30px",
    margin: theme.spacing(1),
    minWidth: 350,
    color: "gray",
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

class FormPartnerDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange, classes } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <TopBar />
          <div className={classes.elements}>
            <br />
            <h1 className={classes.formControl}>
              <u>Partner Preferences</u>
            </h1>
            <h4 className={classes.formControlSmall}>
              Disclaimer: We do our best to accommodate partner
              preferences—however, we can’t guarantee that there is someone in
              the program who is the perfect match.
            </h4>
            <br />
            <h2 className={classes.formControl}>
              Would you like a partner who studies a particular major? If so,
              please include below:
            </h2>
            <h4 className={classes.formControlSmall}>
              If no preference, please leave blank. If adding multiple majors,
              please separate using commas.
            </h4>
            <br />
            <TextField
              placeholder="Enter Your Preferred Major(s)"
              label="Preferred Major(s)"
              onChange={handleChange("preferredMajor")}
              defaultValue={values.preferredMajor}
              margin="normal"
              className={classes.formControl}
            />
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">
                On a scale from 1-5, how important is it to get someone in your
                pair/trio with the same major?
              </FormLabel>
              <RadioGroup
                row
                aria-label="preferredMajorWeight"
                name="preferredMajorWeight1"
                defaultValue={values.preferredMajorWeight}
                onChange={handleChange("preferredMajorWeight")}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
              </RadioGroup>
            </FormControl>
            <br />
            <br />
            <h2 className={classes.formControl}>
              Would you like a partner who studies a particular gender? If so,
              please include below:
            </h2>
            <h4 className={classes.formControlSmall}>
              If no preference, please leave blank.
            </h4>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel id="preferredGender-label">
                Preferred Gender
              </InputLabel>
              <Select
                labelId="preferredGender-label"
                id="preferredGender"
                defaultValue={values.preferredGender}
                onChange={handleChange("preferredGender")}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"TransMale"}>TransMale</MenuItem>
                <MenuItem value={"TransFemale"}>TransFemale</MenuItem>
                <MenuItem value={"Genderqueer"}>Genderqueer</MenuItem>
                <MenuItem value={"Custom"}>Custom</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="Preferred Gender Custom"
              label="If Custom, please specify"
              onChange={handleChange("preferredGenderCustom")}
              defaultValue={values.preferredGenderCustom}
              margin="normal"
              className={classes.formControl}
            />
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">
                On a scale from 1-5, how important is it to get someone in your
                pair/trio with the same gender?
              </FormLabel>
              <div className={classes.elements}>
                <RadioGroup
                  row
                  aria-label="preferredGenderWeight"
                  name="preferredGenderWeight1"
                  defaultValue={values.preferredGenderWeight}
                  onChange={handleChange("preferredGenderWeight")}
                >
                  <FormControlLabel value="1" control={<Radio />} label="1" />
                  <FormControlLabel value="2" control={<Radio />} label="2" />
                  <FormControlLabel value="3" control={<Radio />} label="3" />
                  <FormControlLabel value="4" control={<Radio />} label="4" />
                  <FormControlLabel value="5" control={<Radio />} label="5" />
                </RadioGroup>
              </div>
            </FormControl>
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
              color="primary"
              className={classes.margin}
              onClick={this.continue}
            >
              Next
            </ColorButton>
          </div>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(FormPartnerDetails);
