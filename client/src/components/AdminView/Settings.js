import React, { Component } from "react";
import TopBar from "../IntakeForm/TopBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CsvDownload from "react-json-to-csv";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { Redirect } from "react-router-dom";

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
    boxShadow: "0 3px 5px 2px rgba(60, 75, 120, .3)",
    background: "linear-gradient(45deg, #687732 30%, #7A8B39 90%)",
    backgroundColor: "#c123de",
    borderRadius: "6px",
    border: "0",
    display: "inline-block",
    cursor: "pointer",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    padding: "6px 24px",
    textDecoration: "none",
    textShadow: "0px 1px 0px #9b14b3",
    marginLeft: "30px",
    height: 32,
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
      modalStyle: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
      open: false,
    };
    this.jsonParser = this.jsonParser.bind(this);
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
        alert(
          "Something went wrong in receiving data. Please try again later."
        );
      });
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
        alert("Something went wrong in receiving data. Please try again later.")
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
            SID: student[3],
            class_standing: student[4],
            domestic_status: student[5],
            major: student[6],
            gender: student[7],
            gender_custom: student[8],
            days_of_week: student[9].toString(),
            hope_to_gain: student[10],
            plan_to_meet: student[11],
            lang_1_learn: student[12],
            lang_1_learn_other: student[13],
            lang_1_learn_level: student[14],
            lang_2_learn: student[15],
            lang_2_learn_other: student[16],
            lang_2_learn_level: student[17],
            lang_1_teach: student[18],
            lang_1_teach_other: student[19],
            lang_1_teach_level: student[20],
            lang_2_teach: student[21],
            lang_2_teach_other: student[22],
            lang_2_teach_level: student[23],
            comments: student[24],
            partner_major: student[25],
            partner_major_weight: student[26],
            partner_gender: student[27],
            partner_gender_custom: student[28],
            partner_gender_weight: student[29],
          });
        }
        this.setState({
          student_info: student_info_array,
        });
      })
      .catch((error) =>
        alert("Something went wrong in receiving data. Please try again later.")
      );

    const { REACT_APP_PAIRS } = process.env;
    let pair_info_array = [];
    fetch(REACT_APP_PAIRS)
      .then((response) => response.json())
      .then((data) => {
        for (const pairing of data) {
          pair_info_array.push({
            name_1: pairing[1] + " " + pairing[2],
            email_1: pairing[3],
            SID_1: pairing[4],
            level_1: pairing[5],
            teach_1: this.jsonParser(JSON.parse(pairing[6])),
            learn_1: this.jsonParser(JSON.parse(pairing[7])),
            comments_1: pairing[8],
            name_2: pairing[10] + " " + pairing[11],
            email_2: pairing[12],
            SID_2: pairing[13],
            level_2: pairing[14],
            teach_2: this.jsonParser(JSON.parse(pairing[15])),
            learn_2: this.jsonParser(JSON.parse(pairing[16])),
            comments_2: pairing[17],
            name_3: pairing[19] ? pairing[19] + " " + pairing[20] ?? "" : "",
            email_3: pairing[21] ?? "",
            SID_3: pairing[22] ?? "",
            level_3: pairing[23] ?? "",
            teach_3: this.jsonParser(JSON.parse(pairing[24])) ?? "",
            learn_3: this.jsonParser(JSON.parse(pairing[25])) ?? "",
            comments_3: pairing[26] ?? "",
          });
        }
        this.setState({
          pair_info: pair_info_array,
        });
      })
      .catch((error) =>
        alert("Something went wrong in receiving data. Please try again later.")
      );

    const { REACT_APP_UNPAIRS } = process.env;
    let u_student_info_array = [];
    fetch(REACT_APP_UNPAIRS)
      .then((response) => response.json())
      .then((data) => {
        for (const student of data) {
          u_student_info_array.push({
            first_name: student[1],
            last_name: student[2],
            email: student[3],
            SID: student[4],
            level: student[5],
            teach: this.jsonParser(JSON.parse(student[6])),
            learn: this.jsonParser(JSON.parse(student[7])),
            comments: student[8],
          });
        }
        this.setState({
          u_student_info: u_student_info_array,
        });
      })
      .catch((error) =>
        alert("Something went wrong in receiving data. Please try again later.")
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
        alert("Something went wrong in receiving data. Please try again later.")
      );
  }

  jsonParser(p) {
    let returnString = "";
    for (var key in p) {
      if (p.hasOwnProperty(key) && returnString === "") {
        returnString = returnString + key + ": " + p[key];
      } else if (p.hasOwnProperty(key) && returnString !== "") {
        returnString = returnString + ", " + key + ": " + p[key];
      }
    }
    return returnString;
  }

  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  dangerZone() {
    console.log("Danger Zone");
    this.setState({ deleteData: true });
    this.handleClose();
    return "Success";
  }

  saveChanges() {
    console.log("Saved worked!");
    const { REACT_APP_SAVE } = process.env;
    let endWeek = this.state.endWeek;
    let startWeek = this.state.startWeek;
    if (
      !/^\d+$/.test(startWeek) ||
      !/^\d+$/.test(endWeek) ||
      startWeek >= endWeek
    ) {
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
      .catch((error) =>
        alert("Something went wrong in pushing data. Please try again later.")
      );
    return "Success;";
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

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider>
        <>
          {this.state.redirect}
          {/* {console.log(/^\d+$/.test(this.state.startWeek))} */}
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
            <u>Download Data</u>
          </h2>
          <br />
          <CsvDownload
            data={this.state.student_info}
            filename="intakeform.csv"
            style={{
              boxShadow: "0 3px 5px 2px rgba(60, 75, 120, .3)",
              background: "linear-gradient(45deg, #687732 30%, #7A8B39 90%)",
              backgroundColor: "#c123de",
              borderRadius: "6px",
              border: "0",
              display: "inline-block",
              cursor: "pointer",
              color: "white",
              fontSize: "15px",
              fontWeight: "bold",
              padding: "6px 24px",
              textDecoration: "none",
              textShadow: "0px 1px 0px #9b14b3",
              marginLeft: "30px",
              height: 32,
            }}
          >
            Intake Form Data
          </CsvDownload>
          <CsvDownload
            data={this.state.pair_info}
            filename="pairs.csv"
            style={{
              boxShadow: "0 3px 5px 2px rgba(60, 75, 120, .3)",
              background: "linear-gradient(45deg, #687732 30%, #7A8B39 90%)",
              backgroundColor: "#c123de",
              borderRadius: "6px",
              border: "0",
              display: "inline-block",
              cursor: "pointer",
              color: "white",
              fontSize: "15px",
              fontWeight: "bold",
              padding: "6px 24px",
              textDecoration: "none",
              textShadow: "0px 1px 0px #9b14b3",
              marginLeft: "30px",
              height: 32,
            }}
          >
            Pair Data
          </CsvDownload>
          <CsvDownload
            data={this.state.u_student_info}
            filename="unpaired.csv"
            style={{
              boxShadow: "0 3px 5px 2px rgba(60, 75, 120, .3)",
              background: "linear-gradient(45deg, #687732 30%, #7A8B39 90%)",
              backgroundColor: "#c123de",
              borderRadius: "6px",
              border: "0",
              display: "inline-block",
              cursor: "pointer",
              color: "white",
              fontSize: "15px",
              fontWeight: "bold",
              padding: "6px 24px",
              textDecoration: "none",
              textShadow: "0px 1px 0px #9b14b3",
              marginLeft: "30px",
              height: 32,
            }}
          >
            Unpaired Data
          </CsvDownload>
          <CsvDownload
            data={this.state.timesheet_info}
            filename="timesheet.csv"
            style={{
              boxShadow: "0 3px 5px 2px rgba(60, 75, 120, .3)",
              background: "linear-gradient(45deg, #687732 30%, #7A8B39 90%)",
              backgroundColor: "#c123de",
              borderRadius: "6px",
              border: "0",
              display: "inline-block",
              cursor: "pointer",
              color: "white",
              fontSize: "15px",
              fontWeight: "bold",
              padding: "6px 24px",
              textDecoration: "none",
              textShadow: "0px 1px 0px #9b14b3",
              marginLeft: "30px",
              height: 32,
            }}
          >
            Timesheet Data
          </CsvDownload>
          <br />
          <br />
          <h2 style={{ color: "red" }} className={classes.formControl}>
            <u>Reset Algorithm [DANGER ZONE]</u>
          </h2>
          <ColorButton
            variant="contained"
            color="primary"
            className={classes.margin}
            onClick={this.handleOpen}
          >
            Clear & Reset
          </ColorButton>
          <Modal
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={this.state.modalStyle} className={classes.paper}>
              <h2 id="simple-modal-title">Are you sure?</h2>
              <p id="simple-modal-description">
                Clicking yes will clear all data and will be unrecoverable on
                save. Please download your data before performing this action.
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
              Save
            </ColorButton>
          </div>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Settings);
