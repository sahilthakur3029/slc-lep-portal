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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

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

const allLanguages = [
  "Arabic",
  "Cantonese",
  "English",
  "Farsi",
  "Filipino",
  "French",
  "German",
  "Greek",
  "Hebrew",
  "Hindi",
  "Hokkien",
  "Indonesian",
  "Italian",
  "Japanese",
  "Korean",
  "Mandarin",
  "Punjabi",
  "Portuguese",
  "Russian",
  "Spanish",
  "Swedish",
  "Thai",
  "Vietnamese",
  "Other",
];

class FormLanguageDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  // Display the page
  render() {
    const { values, handleChange, classes } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <TopBar />
          <br />
          <div className={classes.elements}>
            <h1 className={classes.heads}>
              <u>Language Exchange</u>
            </h1>
            <h2 className={classes.heads}>
              What languages do you want to practice?
            </h2>
            <br />
            <FormControl className={classes.formControl} required>
              <InputLabel id="firstChoiceLearn-label">First Choice</InputLabel>
              <Select
                labelId="firstChoiceLearn-label"
                id="firstChoiceLearn"
                value={values.firstChoiceLearn}
                onChange={handleChange("firstChoiceLearn")}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {allLanguages.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              placeholder="Other Language"
              label="If other, please specify here or leave blank"
              onChange={handleChange("firstChoiceLearnOther")}
              defaultValue={values.firstChoiceLearnOther}
              margin="normal"
              className={classes.formControl}
            />
            <FormControl
              component="fieldset"
              required
              className={classes.formControl}
            >
              <FormLabel component="legend">
                On a scale from 1-5, how proficient are you in this language?
              </FormLabel>
              <RadioGroup
                row
                aria-label="firstChoiceLearnLevel"
                name="firstChoiceLearnLevel1"
                defaultValue={values.firstChoiceLearnLevel}
                onChange={handleChange("firstChoiceLearnLevel")}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
              </RadioGroup>
            </FormControl>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel id="secondChoiceLearn-label">
                Second Choice (optional)
              </InputLabel>
              <Select
                labelId="secondChoiceLearn-label"
                id="secondChoiceLearn"
                value={values.secondChoiceLearn}
                onChange={handleChange("secondChoiceLearn")}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {allLanguages.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              placeholder="Other Language"
              label="If other, please specify here or leave blank"
              onChange={handleChange("secondChoiceLearnOther")}
              defaultValue={values.secondChoiceLearnOther}
              margin="normal"
              className={classes.formControl}
            />
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">
                On a scale from 1-5, how proficient are you in this language?
              </FormLabel>
              <RadioGroup
                row
                aria-label="secondChoiceLearnLevel"
                name="secondChoiceLearnLevel1"
                defaultValue={values.secondChoiceLearnLevel}
                onChange={handleChange("secondChoiceLearnLevel")}
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
            <h2 className={classes.heads}>
              What languages do you want to help your partner(s) practice?
            </h2>
            <br />
            <FormControl className={classes.formControl} required>
              <InputLabel id="firstChoiceTeach-label">First Choice</InputLabel>
              <Select
                labelId="firstChoiceTeach-label"
                id="firstChoiceTeach"
                value={values.firstChoiceTeach}
                onChange={handleChange("firstChoiceTeach")}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {allLanguages.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              placeholder="Other Language"
              label="If other, please specify here or leave blank"
              onChange={handleChange("firstChoiceTeachOther")}
              defaultValue={values.firstChoiceTeachOther}
              margin="normal"
              className={classes.formControl}
            />
            <FormControl
              component="fieldset"
              required
              className={classes.formControl}
            >
              <FormLabel component="legend">
                On a scale from 1-5, how proficient are you in this language?
              </FormLabel>
              <RadioGroup
                row
                aria-label="firstChoiceTeachLevel"
                name="firstChoiceTeachLevel1"
                defaultValue={values.firstChoiceTeachLevel}
                onChange={handleChange("firstChoiceTeachLevel")}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
              </RadioGroup>
            </FormControl>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel id="secondChoiceTeachlabel">
                Second Choice (optional)
              </InputLabel>
              <Select
                labelId="secondChoiceTeach-label"
                id="secondChoiceTeach"
                value={values.secondChoiceTeach}
                onChange={handleChange("secondChoiceTeach")}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {allLanguages.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              placeholder="Other Language"
              label="If other, please specify here or leave blank"
              onChange={handleChange("secondChoiceTeachOther")}
              defaultValue={values.secondChoiceTeachOther}
              margin="normal"
              className={classes.formControl}
            />
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">
                On a scale from 1-5, how proficient are you in this language?
              </FormLabel>
              <RadioGroup
                row
                aria-label="secondChoiceTeachLevel"
                name="secondChoiceTeachLevel1"
                defaultValue={values.secondChoiceTeachLevel}
                onChange={handleChange("secondChoiceTeachLevel")}
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
            <h2 className={classes.heads}>
              Is there any additional information you'd like us to know?
            </h2>
            <br />
            <TextField
              label="If you would like to request a partner, please include that information here."
              onChange={handleChange("comments")}
              defaultValue={values.comments}
              margin="normal"
              style={{
                margin: 0,
                width: "75%",
              }}
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

export default withStyles(useStyles)(FormLanguageDetails);
