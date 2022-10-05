import React, { Component } from "react";
import TopBar from "../IntakeForm/TopBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CsvDownload from "react-json-to-csv";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { Redirect } from "react-router-dom";
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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  heads: {
    color: "black",
    textAlign: "center",
    fontSize: 40,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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

const ColorButton1 = withStyles((theme) => ({
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

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currSem: "",
      calendarLink: "",
      startWeek: "",
      endWeek: "",
      student_info: "",
      pair_info: "",
      u_student_info: "",
      orientationKey: "",
      timesheet_info: "",
      csrfToken: "",
      redirect: null,
      deleteData: false,
      openAlert: false,
      modalStyle: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
      open: false,
      mail_merge: "",
      mail_merge_unpaired: "",
      isAuthenticated: "",
    };
    this.jsonParser = this.jsonParser.bind(this);
    this.formatNames = this.formatNames.bind(this);
    this.formatEmail = this.formatEmail.bind(this);
    this.dangerZone = this.dangerZone.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
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
        this.setState({ redirect: <Redirect push to="/signin" /> });
      });
    const { REACT_APP_GET_SESSION } = process.env;
    fetch(REACT_APP_GET_SESSION, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.login === true) {
          this.setState({ isAuthenticated: true });
          const { REACT_APP_TSRENDER } = process.env;
          fetch(REACT_APP_TSRENDER)
            .then((response) => response.json())
            .then((data) => {
              this.setState({
                calendarLink: data.calendarLink,
                currSem: data.semester,
                startWeek: data.allWeeks[0],
                endWeek: data.allWeeks[data.allWeeks.length - 1],
                orientationKey: data.orientationKey,
              });
            })
            .catch((error) =>
              alert(
                "Something went wrong in receiving data. Please try again later."
              )
            );
          const { REACT_APP_NAMES } = process.env;
          let student_info_array = [];

          fetch(REACT_APP_NAMES)
            .then((response) => response.json())
            .then((data) => {
              for (const student of data) {
                student_info_array.push({
                  first_name: student[0],
                  last_name: student[1],
                  email: student[2],
                  class_standing: student[3],
                  domestic_status: student[4],
                  major: student[5],
                  gender: student[6],
                  gender_custom: student[7],
                  days_of_week: student[8].toString(),
                  hope_to_gain: student[9],
                  plan_to_meet: student[10],
                  lang_1_learn: student[11],
                  lang_1_learn_other: student[12],
                  lang_1_learn_level: student[13],
                  lang_2_learn: student[14],
                  lang_2_learn_other: student[15],
                  lang_2_learn_level: student[16],
                  lang_1_teach: student[17],
                  lang_1_teach_other: student[18],
                  lang_1_teach_level: student[19],
                  lang_2_teach: student[20],
                  lang_2_teach_other: student[21],
                  lang_2_teach_level: student[22],
                  comments: student[23],
                  partner_major: student[24],
                  partner_major_weight: student[25],
                  partner_gender: student[26],
                  partner_gender_custom: student[27],
                  partner_gender_weight: student[28],
                });
              }
              this.setState({
                student_info: student_info_array,
              });
            })
            .catch((error) =>
              alert(
                "Something went wrong in receiving data. Please try again later."
              )
            );

          const { REACT_APP_PAIRS } = process.env;
          let pair_info_array = [];
          let mail_merge_array = [];

          fetch(REACT_APP_PAIRS)
            .then((response) => response.json())
            .then((data) => {
              for (const pairing of data) {
                let pair_size = "";
                if (pairing[19] === null) {
                  pair_size = "pair";
                } else {
                  pair_size = "trio";
                }
                mail_merge_array.push({
                  "First Name": this.formatNames(
                    pairing[1],
                    pairing[9],
                    pairing[17]
                  ),
                  "Subject Pair Size":
                    pair_size[0].toUpperCase() + pair_size.substring(1),
                  "Body Pair Size": pair_size,
                  Email: this.formatEmail(pairing[3], pairing[11], pairing[19]),
                });
                pair_info_array.push({
                  first_name_1: pairing[1],
                  last_name_1: pairing[2],
                  email_1: pairing[3],
                  level_1: pairing[4],
                  teach_1: this.jsonParser(pairing[5]),
                  learn_1: this.jsonParser(pairing[6]),
                  comments_1: pairing[7],
                  first_name_2: pairing[9],
                  last_name_2: pairing[10],
                  email_2: pairing[11],
                  level_2: pairing[12],
                  teach_2: this.jsonParser(pairing[13]),
                  learn_2: this.jsonParser(pairing[14]),
                  comments_2: pairing[15],
                  first_name_3: pairing[17] ?? "",
                  last_name_3: pairing[18] ?? "",
                  email_3: pairing[19] ?? "",
                  level_3: pairing[20] ?? "",
                  teach_3: this.jsonParser(pairing[21]) ?? "",
                  learn_3: this.jsonParser(pairing[22]) ?? "",
                  comments_3: pairing[23] ?? "",
                });
              }
              this.setState({
                pair_info: pair_info_array,
                mail_merge: mail_merge_array,
              });
            })
            .catch((error) =>
              alert(
                "Something went wrong in receiving data. Please try again later."
              )
            );

          const { REACT_APP_UNPAIRS } = process.env;
          let u_student_info_array = [];
          let mail_merge_unpaired_array = [];
          fetch(REACT_APP_UNPAIRS)
            .then((response) => response.json())
            .then((data) => {
              for (const student of data) {
                mail_merge_unpaired_array.push({
                  "First Name": student[1],
                  Email: student[3],
                });
                u_student_info_array.push({
                  first_name: student[1],
                  last_name: student[2],
                  email: student[3],
                  level: student[4],
                  teach: this.jsonParser(student[5]),
                  learn: this.jsonParser(student[6]),
                  comments: student[7],
                });
              }
              this.setState({
                u_student_info: u_student_info_array,
                mail_merge_unpaired: mail_merge_unpaired_array,
              });
            })
            .catch((error) =>
              alert(
                "Something went wrong in receiving data. Please try again later."
              )
            );
          const { REACT_APP_TIMESHEET } = process.env;
          let timesheet_info_array = [];
          fetch(REACT_APP_TIMESHEET)
            .then((response) => response.json())
            .then((data) => {
              for (const student of data) {
                timesheet_info_array.push({
                  first_name: student[0],
                  last_name: student[1],
                  partner_names: student[2],
                  hours: student[3],
                  week: student[4],
                });
              }
              this.setState({
                timesheet_info: timesheet_info_array,
              });
            })
            .catch((error) =>
              alert(
                "Something went wrong in receiving data. Please try again later."
              )
            );
        } else {
          this.setState({ redirect: <Redirect push to="/signin" /> });
        }
      })
      .catch((err) => {
        alert("Something went wrong. Please try again later.");
      });
  }

  jsonParser(p) {
    try {
      p = JSON.parse(p);
      let returnString = "";
      for (var key in p) {
        if (p.hasOwnProperty(key) && returnString === "") {
          returnString = returnString + key + ": " + p[key];
        } else if (p.hasOwnProperty(key) && returnString !== "") {
          returnString = returnString + ", " + key + ": " + p[key];
        }
      }
      return returnString;
    } catch (error) {
      return "Parsing Error";
    }
  }

  formatNames(p1name, p2name, p3name) {
    if (p3name === null) {
      return p1name + " and " + p2name;
    } else {
      return p1name + ", " + p2name + " and " + p3name;
    }
  }

  formatEmail(p1email, p2email, p3email) {
    if (p3email === null) {
      return p1email + ", " + p2email;
    } else {
      return p1email + ", " + p2email + ", " + p3email;
    }
  }

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  dangerZone() {
    this.setState({ deleteData: true });
    this.handleClose();
    return "Success";
  }

  saveChanges() {
    const { REACT_APP_SAVE } = process.env;
    let endWeek = this.state.endWeek;
    let startWeek = this.state.startWeek;
    if (
      !/^\d+$/.test(startWeek) ||
      !/^\d+$/.test(endWeek) ||
      startWeek >= endWeek
    ) {
      // Could later change this to an error instead for clarity
      startWeek = 3;
      endWeek = 16;
    }
    fetch(REACT_APP_SAVE, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.state.csrfToken,
      },
      body: JSON.stringify({
        currSem: this.state.currSem,
        calendarLink: this.state.calendarLink,
        orientationKey: this.state.orientationKey,
        startWeek: startWeek,
        endWeek: endWeek,
        deleteData: this.state.deleteData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          this.setState({ openAlert: true });
          return "Success";
        } else {
          this.setState({ redirect: <Redirect push to="/signin" /> });
        }
      })
      .catch((error) =>
        alert("Something went wrong. Please reload and try again later.")
      );
    return "Failed";
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseOnNo = () => {
    this.setState({ open: false, deleteData: false });
  };

  handleCloseOnAlert = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openAlert: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider>
        <>
          {this.state.redirect}
          <Snackbar
            open={this.state.openAlert}
            autoHideDuration={5000}
            onClose={() => this.setState({ openAlert: false })}
          >
            <Alert onClose={this.handleCloseOnAlert} severity="success">
              Save Successful!
            </Alert>
          </Snackbar>
          <TopBar />
          <br />
          <h1 className={classes.heads}>Settings</h1>
          <h2 className={classes.formControl}>
            <u>Intake Form / Timesheet Configurations</u>
          </h2>
          <TextField
            placeholder="Current Semester"
            label="Change Current Semester"
            onChange={this.handleChange("currSem")}
            value={this.state.currSem}
            margin="normal"
            className={classes.formControl}
          />
          <TextField
            placeholder="Current Calendar"
            label="Change Academic Calendar Link"
            onChange={this.handleChange("calendarLink")}
            value={this.state.calendarLink}
            margin="normal"
            className={classes.formControl}
          />
          <TextField
            placeholder="Current Orientation Key"
            label="Change Orientation Key"
            onChange={this.handleChange("orientationKey")}
            value={this.state.orientationKey}
            margin="normal"
            className={classes.formControl}
          />
          <br />
          <TextField
            placeholder="SLC Start Week Number"
            label="Change SLC Start Week Number"
            onChange={this.handleChange("startWeek")}
            value={this.state.startWeek}
            margin="normal"
            className={classes.formControl}
          />
          <TextField
            placeholder="SLC End Week Number"
            label="Change SLC End Week Number"
            onChange={this.handleChange("endWeek")}
            value={this.state.endWeek}
            margin="normal"
            className={classes.formControl}
          />
          <br />
          <br />
          <h2 className={classes.formControl}>
            <u>Download Mail Merge Data</u>
          </h2>
          <br />
          <CsvDownload
            data={this.state.mail_merge}
            filename="mailmerge.csv"
            style={{
              color: "#fff",
              marginLeft: "30px",
              backgroundColor: "#859438",
              boxShadow:
                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
              padding: "6px 16px",
              minWidth: "64px",
              transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              fontSize: "0.875rem",
              fontWeight: "500",
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              lineHeight: "1.75",
              borderRadius: "4px",
              letterSpacing: "0.02857em",
              textTransform: "uppercase",
              border: "0",
              display: "inline-flex",
              alignItems: "center",
              verticalAlign: "middle",
              justifyContent: "center",
              textAlign: "center",
              wordSpacing: "normal",
              cursor: "pointer",
              textDecoration: "none",
              textShadow: "none",
              height: 32,
            }}
          >
            Mail Merge Pairs/Trios
          </CsvDownload>
          <CsvDownload
            data={this.state.mail_merge_unpaired}
            filename="mailmerge_unpaired.csv"
            style={{
              color: "#fff",
              marginLeft: "30px",
              backgroundColor: "#859438",
              boxShadow:
                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
              padding: "6px 16px",
              minWidth: "64px",
              transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              fontSize: "0.875rem",
              fontWeight: "500",
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              lineHeight: "1.75",
              borderRadius: "4px",
              letterSpacing: "0.02857em",
              textTransform: "uppercase",
              border: "0",
              display: "inline-flex",
              alignItems: "center",
              verticalAlign: "middle",
              justifyContent: "center",
              textAlign: "center",
              wordSpacing: "normal",
              cursor: "pointer",
              textDecoration: "none",
              textShadow: "none",
              height: 32,
            }}
          >
            Mail Merge Unpaired
          </CsvDownload>
          <br />
          <br />
          <h2 className={classes.formControl}>
            <u>Download Table Data</u>
          </h2>
          <br />
          <CsvDownload
            data={this.state.student_info}
            filename="intakeform.csv"
            style={{
              color: "#fff",
              marginLeft: "30px",
              backgroundColor: "#859438",
              boxShadow:
                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
              padding: "6px 16px",
              minWidth: "64px",
              transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              fontSize: "0.875rem",
              fontWeight: "500",
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              lineHeight: "1.75",
              borderRadius: "4px",
              letterSpacing: "0.02857em",
              textTransform: "uppercase",
              border: "0",
              display: "inline-flex",
              alignItems: "center",
              verticalAlign: "middle",
              justifyContent: "center",
              textAlign: "center",
              wordSpacing: "normal",
              cursor: "pointer",
              textDecoration: "none",
              textShadow: "none",
              height: 32,
            }}
          >
            Intake Form Data
          </CsvDownload>
          <CsvDownload
            data={this.state.pair_info}
            filename="pairs.csv"
            style={{
              color: "#fff",
              marginLeft: "30px",
              backgroundColor: "#859438",
              boxShadow:
                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
              padding: "6px 16px",
              minWidth: "64px",
              transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              fontSize: "0.875rem",
              fontWeight: "500",
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              lineHeight: "1.75",
              borderRadius: "4px",
              letterSpacing: "0.02857em",
              textTransform: "uppercase",
              border: "0",
              display: "inline-flex",
              alignItems: "center",
              verticalAlign: "middle",
              justifyContent: "center",
              textAlign: "center",
              wordSpacing: "normal",
              cursor: "pointer",
              textDecoration: "none",
              textShadow: "none",
              height: 32,
            }}
          >
            Pair Data
          </CsvDownload>
          <CsvDownload
            data={this.state.u_student_info}
            filename="unpaired.csv"
            style={{
              color: "#fff",
              marginLeft: "30px",
              backgroundColor: "#859438",
              boxShadow:
                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
              padding: "6px 16px",
              minWidth: "64px",
              transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              fontSize: "0.875rem",
              fontWeight: "500",
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              lineHeight: "1.75",
              borderRadius: "4px",
              letterSpacing: "0.02857em",
              textTransform: "uppercase",
              border: "0",
              display: "inline-flex",
              alignItems: "center",
              verticalAlign: "middle",
              justifyContent: "center",
              textAlign: "center",
              wordSpacing: "normal",
              cursor: "pointer",
              textDecoration: "none",
              textShadow: "none",
              height: 32,
            }}
          >
            Unpaired Data
          </CsvDownload>
          <CsvDownload
            data={this.state.timesheet_info}
            filename="timesheet.csv"
            style={{
              color: "#fff",
              marginLeft: "30px",
              backgroundColor: "#859438",
              boxShadow:
                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
              padding: "6px 16px",
              minWidth: "64px",
              transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              fontSize: "0.875rem",
              fontWeight: "500",
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
              lineHeight: "1.75",
              borderRadius: "4px",
              letterSpacing: "0.02857em",
              textTransform: "uppercase",
              border: "0",
              display: "inline-flex",
              alignItems: "center",
              verticalAlign: "middle",
              justifyContent: "center",
              textAlign: "center",
              wordSpacing: "normal",
              cursor: "pointer",
              textDecoration: "none",
              textShadow: "none",
              height: 32,
            }}
          >
            Timesheet Data
          </CsvDownload>
          <br />
          <br />
          <h2 style={{ color: "red" }} className={classes.formControl}>
            <u>[DANGER ZONE] Reset Algorithm</u>
          </h2>
          <ColorButton1
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={this.handleOpen}
          >
            Clear & Reset
          </ColorButton1>
          <Modal
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={this.state.modalStyle} className={classes.paper}>
              <h2 id="simple-modal-title">Are you sure?</h2>
              <p id="simple-modal-description">
                Clicking yes will clear all data and will be unrecoverable{" "}
                <b> on save</b>. Please download your data before performing
                this action.
              </p>
              <button type="button" onClick={this.dangerZone}>
                &nbsp;Yes&nbsp;
              </button>{" "}
              <button type="button" onClick={this.handleCloseOnNo}>
                &nbsp;No&nbsp;
              </button>
            </div>
          </Modal>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ColorButton
              variant="contained"
              color="primary"
              className={classes.margin}
              onClick={() =>
                this.setState({ redirect: <Redirect push to="/adminhome" /> })
              }
            >
              Back
            </ColorButton>
            <ColorButton
              variant="contained"
              color="primary"
              className={classes.margin}
              onClick={this.saveChanges}
            >
              Save Changes
            </ColorButton>
            <br />
          </div>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Settings);
