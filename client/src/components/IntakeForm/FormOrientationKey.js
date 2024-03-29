import React, { Component } from "react";
import TopBar from "./TopBar.js";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

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
    marginLeft: "20%",
    marginRight: "20%",
    textAlign: "justify",
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
          <Snackbar
            open={this.state.open}
            autoHideDuration={5000}
            onClose={() => this.setState({ open: false })}
          >
            <Alert onClose={this.handleClose} severity="error">
              Incorrect orientation key
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
              Thank you for your interest in the SLC Language Exchange Program’s{" "}
              <a
                style={{ color: "inherit" }}
                target="_blank"
                rel="noreferrer"
                href={
                  "https://" +
                  "slc.berkeley.edu/programs/language-exchange-program/formats-service#pairtrio"
                }
              >
                Pair/Trio format
              </a>
              ! You can complete the following form to give us your partner
              preferences and be added into our pairing pool for the current
              semester. To begin, please type in the key that you received at
              orientation.
            </h3>
            <br />
            <h3 className={classes.infoText}>
              Note that all new and returning LEP participants are required to
              attend an orientation each semester. You can learn more and see
              our current schedule at{" "}
              <a
                style={{ color: "inherit" }}
                target="_blank"
                rel="noreferrer"
                href={
                  "https://" +
                  "slc.berkeley.edu/programs/language-exchange-program/formats-service#lep-welcome"
                }
              >
                slc.berkeley.edu/lep-orientations
              </a>
              .
            </h3>
            <br />

            <TextField
              style={{
                margin: 0,
                width: "50%",
              }}
              placeholder="Orientation Key"
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
            <br />
            <h3 className={classes.infoText}>
              You can learn more about the SLC Language Exchange Program at{" "}
              <a
                style={{ color: "inherit" }}
                target="_blank"
                rel="noreferrer"
                href={"https://slc.berkeley.edu/language-exchange-program"}
              >
                slc.berkeley.edu/lep
              </a>
              . For questions or concerns, please contact{" "}
              <a
                style={{ color: "inherit" }}
                href="mailto: slc-lep@berkeley.edu"
              >
                slc-lep@berkeley.edu
              </a>
              .
            </h3>
          </div>
          <footer>
            <Box
              px={{ xs: 3, sm: 10 }}
              py={{ xs: 3, sm: 5 }}
              bgcolor="#859438"
              color="white"
            >
              <Container maxWidth="lg">
                <Grid container spacing={5}>
                  <Grid>
                    <Box>
                      <a
                        style={{ color: "#000000" }}
                        target="_blank"
                        rel="noreferrer"
                        href={"https://open.berkeley.edu/privacy-statement"}
                      >
                        Privacy
                      </a>
                    </Box>
                    <Box style={{ color: "#000000" }}>
                      <b>Acknowledgements</b>
                    </Box>
                    <Box style={{ color: "#000000" }}>
                      The SLC Language Exchange Program is grateful to Sahil
                      Thakur for his resourcefulness, creativity, and commitment
                      in the programming and creation of this application.
                      Appreciation also goes to Riddhi Bagadiaa for her work in
                      the early stages of this website. Thank you to Maya
                      Mahajan and Khuyen Nguyen for their vision, leadership,
                      and guidance on this project.
                    </Box>
                    <br />
                    <Box style={{ color: "#000000" }}>
                      The creation of this application was funded in part by a
                      grant from the{" "}
                      <a
                        style={{ color: "inherit" }}
                        target="_blank"
                        rel="noreferrer"
                        href={"https://techfund.berkeley.edu/"}
                      >
                        UC Berkeley Student Technology Fund
                      </a>
                      .
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </footer>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(FormOrientationKey);
