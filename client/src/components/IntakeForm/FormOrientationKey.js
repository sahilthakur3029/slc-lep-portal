import React, { Component } from "react";
import TopBar from "./TopBar.js";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
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
    fontSize: 40,
  },
  elements: {
    textAlign: "center",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  questionMark: { fontSize: "medium" },
  infoText: {
    marginLeft: "10%",
    marginRight: "10%",
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#859438"),
    backgroundColor: "#859438",
    "&:hover": {
      backgroundColor: "#848438",
    },
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
            <u>LEP {this.state.semester} Intake Form</u>
          </h1>
          <div className={classes.elements}>
            <h3 className={classes.infoText}>
              The SLC Language Exchange Program provides a platform for Cal
              students to share their language skills and cultural knowledge.
              Through language practice and community socials, we serve as a
              space for all students to meaningfully engage and benefit from
              Cal’s global diversity.
            </h3>
            <br />
            <h3 className={classes.infoText}>
              We believe that linguistic and cultural diversity is integral to
              Cal’s academic excellence and reputation as the world’s leading
              public university. By tapping into this diversity, we enable
              participants to refine not only their language skills but also
              their ability to function fluidly in diverse cultural contexts.
              Based on mutual exchange, we aim to foster meaningful connections
              within and across communities of language speakers, learners, and
              practitioners at Cal. By deepening our knowledge of one another,
              we seek to strengthen the bonds that unite us and break down the
              barriers that divide us. In doing so, we re-invigorate our respect
              for and commitment to our shared humanity.
            </h3>
            <br />
            <h3 className={classes.infoText}>
              In order to join our Language Exchange Program and to be paired
              with 1-2 peers who are proficient in the language you’d like to
              practice and are seeking support with a language you know, we ask
              that you attend an orienatation first. More information on signing
              up for an orienatation can be found{" "}
              <a
                target="_blank"
                href={
                  "https://" +
                  "slc.berkeley.edu/programs/language-exchange-program/formats-service#lep-welcome"
                }
              >
                here.
              </a>{" "}
              Once you've attended an orientation, you should have recevied an
              orientation key in order to access the intake form. Please enter
              the key below and click Next to start filling out the intake form.
            </h3>
            <TextField
              style={{
                margin: 0,
                width: "75%",
              }}
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
