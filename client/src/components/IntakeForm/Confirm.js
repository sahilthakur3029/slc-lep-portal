import React, { Component } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import TopBar from "./TopBar.js";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { titleCase } from "title-case";
import Box from "@material-ui/core/Box";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
// Need to know what this theme is
const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  elements: {
    textAlign: "center",
  },
});

// Colour of the buttons on the last page, changed the hover colour
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

class Confirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      csrfToken: "",
    };
  }
  componentDidMount() {
    const { REACT_APP_CSRF } = process.env;
    fetch(REACT_APP_CSRF, {
      credentials: "include",
    })
      .then((res) => {
        console.log(res.headers.get(["X-CSRFToken"]));
        this.setState({ csrfToken: res.headers.get(["X-CSRFToken"]) });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };
  continue = (e) => {
    e.preventDefault();
    if (
      // checking if all of these blanks are empty?
      // That means a new form has been opened? Look at open variable
      this.props.values.firstName.trim() === "" ||
      this.props.values.lastName.trim() === "" ||
      this.props.values.email.trim() === "" ||
      this.props.values.academicTitle.trim() === "" ||
      this.props.values.residency.trim() === "" ||
      this.props.values.hopeToGain.trim() === "" ||
      this.props.values.planToMeet.trim() === "" ||
      this.props.values.firstChoiceLearn.trim() === "" ||
      this.props.values.firstChoiceLearnLevel.trim() === "" ||
      this.props.values.firstChoiceTeach.trim() === "" ||
      this.props.values.firstChoiceTeachLevel.trim() === "" ||
      this.props.values.waiverAccept.trim() === ""
    ) {
      this.setState({ open: true });
      return;
    }

    const { REACT_APP_APPLICANT } = process.env;
    fetch(REACT_APP_APPLICANT, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.state.csrfToken,
      },
      body: JSON.stringify({
        firstName: titleCase(this.props.values.firstName.trim()),
        lastName: titleCase(this.props.values.lastName.trim()),
        email: this.props.values.email.trim(),
        academicTitle: this.props.values.academicTitle,
        residency: this.props.values.residency,
        major: this.props.values.major.trim(),
        gender: this.props.values.gender,
        genderCustom: this.props.values.genderCustom,
        availability: this.props.values.availability,
        hopeToGain: this.props.values.hopeToGain,
        planToMeet: this.props.values.planToMeet,
        firstChoiceLearn: this.props.values.firstChoiceLearn,
        firstChoiceLearnOther: this.props.values.firstChoiceLearnOther,
        firstChoiceLearnLevel: this.props.values.firstChoiceLearnLevel,
        secondChoiceLearn: this.props.values.secondChoiceLearn,
        secondChoiceLearnOther: this.props.values.secondChoiceLearnOther,
        secondChoiceLearnLevel: this.props.values.secondChoiceLearnLevel,
        firstChoiceTeach: this.props.values.firstChoiceTeach,
        firstChoiceTeachOther: this.props.values.firstChoiceTeachOther,
        firstChoiceTeachLevel: this.props.values.firstChoiceTeachLevel,
        secondChoiceTeach: this.props.values.secondChoiceTeach,
        secondChoiceTeachOther: this.props.values.secondChoiceTeachOther,
        secondChoiceTeachLevel: this.props.values.secondChoiceTeachLevel,
        comments: this.props.values.comments,
        preferredMajor: this.props.values.preferredMajor.trim(),
        preferredMajorWeight: this.props.values.preferredMajorWeight,
        preferredGender: this.props.values.preferredGender,
        preferredGenderCustom: this.props.values.preferredGenderCustom,
        preferredGenderWeight: this.props.values.preferredGenderWeight,
        waiverAccept: this.props.values.waiverAccept,
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.log("Error", error));
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  // Displaying the final review page with all the values fed in
  render() {
    const {
      values: {
        firstName,
        lastName,
        email,
        academicTitle,
        residency,
        major,
        gender,
        genderCustom,
        availability,
        hopeToGain,
        planToMeet,
        firstChoiceLearn,
        firstChoiceLearnOther,
        firstChoiceLearnLevel,
        secondChoiceLearn,
        secondChoiceLearnOther,
        secondChoiceLearnLevel,
        firstChoiceTeach,
        firstChoiceTeachOther,
        firstChoiceTeachLevel,
        secondChoiceTeach,
        secondChoiceTeachOther,
        secondChoiceTeachLevel,
        comments,
        preferredMajor,
        preferredMajorWeight,
        preferredGender,
        preferredGenderCustom,
        preferredGenderWeight,
        waiverAccept,
      },
      classes,
    } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <div className={classes.elements}>
            <Snackbar
              open={this.state.open}
              autoHideDuration={5000}
              onClose={() => this.setState({ open: false })}
            >
              <Alert onClose={this.handleClose} severity="error">
                Please make sure you have filled out all the required fields
                marked by a *
              </Alert>
            </Snackbar>
            <TopBar />
            <br />
            <h1 className={classes.formControl}>
              <u>Confirmation</u>
            </h1>
            <List>
              <ListItem>
                <ListItemText
                  primary="First Name:*"
                  secondary={firstName}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Last Name:*"
                  secondary={lastName}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Email:*"
                  secondary={email}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Academic Title:*"
                  secondary={academicTitle}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Residency:*"
                  secondary={residency}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Major(s):"
                  secondary={major}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Gender:"
                  secondary={gender}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Gender Custom Response (If Applicable):"
                  secondary={genderCustom}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Days of Week Availability:"
                  secondary={availability.join(", ")}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="What do you hope to gain from the SLC Language Exchange Program:*"
                  secondary={hopeToGain}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="How do you plan to maintain your motivation to meet with your partner(s) weekly:*"
                  secondary={planToMeet}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="First Choice Learn:*"
                  secondary={firstChoiceLearn}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="First Choice Learn Other:"
                  secondary={firstChoiceLearnOther}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="First Choice Learn Level:*"
                  secondary={firstChoiceLearnLevel}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Second Choice Learn:"
                  secondary={secondChoiceLearn}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Second Choice Learn Other:"
                  secondary={secondChoiceLearnOther}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Second Choice Learn Level:"
                  secondary={secondChoiceLearnLevel}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="First Choice Teach:*"
                  secondary={firstChoiceTeach}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="First Choice Teach Other:"
                  secondary={firstChoiceTeachOther}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="First Choice Learn Teach Level:*"
                  secondary={firstChoiceTeachLevel}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Second Choice Teach:"
                  secondary={secondChoiceTeach}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Second Choice Teach Other:"
                  secondary={secondChoiceTeachOther}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Second Choice Teach Level:"
                  secondary={secondChoiceTeachLevel}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Comments:"
                  secondary={comments}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Preferred Major(s):"
                  secondary={preferredMajor}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Preferred Major(s) Preference Level:"
                  secondary={preferredMajorWeight}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Preferred Gender:"
                  secondary={preferredGender}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Preferred Gender Custom Response (If Applicable):"
                  secondary={preferredGenderCustom}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Preferred Gender Preference Level:"
                  secondary={preferredGenderWeight}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Waiver Acknowledgment:*"
                  secondary={waiverAccept}
                  style={{ textAlign: "center" }}
                />
              </ListItem>
            </List>
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
              Confirm & Continue
            </ColorButton>
          </div>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Confirm);
