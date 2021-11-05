import React, { Component } from "react";
import TopBar from "./TopBar.js";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 350,
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

class FormWaiver extends Component {
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
          <br />
          <div className={classes.elements}>
            <h1 className={classes.formControl}>
              <u>
                Waiver of Liability, Assumption of Risk, and Indemnity Agreement
              </u>
            </h1>
            <h4 className={classes.formControlSmall}>
              UNIVERSITY OF CALIFORNIA AT BERKELEY
            </h4>
            <h4 className={classes.formControlSmall}>
              Language Exchange Program
            </h4>
            <h4 className={classes.formControlSmall}>
              Waiver: In consideration of being permitted to participate in any
              way in the Language Exchange Program, I, for myself, my heirs,
              personal representatives or assigns, do hereby release, waive,
              discharge, and covenant not to sue The Regents of the University
              of California, its officers, employees, and agents from liability
              from any and all claims including the negligence of The Regents of
              the University of California, its officers, employees and agents,
              resulting in personal injury, accidents or illnesses (including
              death), and property loss arising from, but not limited to,
              participation in the Language Exchange Program.
            </h4>
            <h4 className={classes.formControlSmall}>
              Assumption of Risks: Participation in the Language Exchange
              Program carries with it certain inherent risks that cannot be
              eliminated regardless of the care taken to avoid damages or
              injuries. The specific risks vary from one activity to another,
              but the risks range from 1) minor injuries such as scratches,
              bruises, and sprains 2) major injuries such as eye injury or loss
              of sight, joint or back injuries, heart attacks, and concussions
              3) catastrophic injuries including paralysis and death.
            </h4>
            <h4 className={classes.formControlSmall}>
              Indemnification and Hold Harmless: I also agree to INDEMNIFY AND
              HOLD the Regents of the University of California HARMLESS from any
              and all claims, actions, suits, procedures, costs, expenses,
              damages and liabilities, including attorney’s fees brought as a
              result of my involvement in the Language Exchange Program and to
              reimburse them for any such expenses incurred.
            </h4>
            <h4 className={classes.formControlSmall}>
              Severability: The undersigned further expressly agrees that the
              foregoing waiver and assumption of risks agreement is intended to
              be as broad and inclusive as is permitted by the law of the State
              of California and that if any portion thereof is held invalid, it
              is agreed that the balance shall, notwithstanding, continue in
              full legal force and effect.
            </h4>
            <br />
            <h2 className={classes.formControl}>
              Acknowledgment of Understanding: I have read this waiver of
              liability, assumption of risk, and indemnity agreement, fully
              understand its terms, and understand that I am giving up
              substantial rights, including my right to sue. I acknowledge that
              I am signing the agreement freely and voluntarily, and intend by
              my signature to be a complete and unconditional release of all
              liability to the greatest extent allowed by law. I have read the
              previous paragraphs and I know, understand, and appreciate these
              and other risks that are inherent in the Language Exchange
              Program. I hereby assert that my participation is voluntary and
              that I knowingly assume all such risks.
            </h2>
            <TextField
              placeholder="Enter name here"
              label="Please type your name to confirm your understanding"
              onChange={handleChange("waiverAccept")}
              defaultValue={values.waiverAccept}
              margin="normal"
              required
              style={{
                margin: 0,
                width: "77%",
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

export default withStyles(useStyles)(FormWaiver);
