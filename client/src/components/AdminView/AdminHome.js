import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TopBar from "../IntakeForm/TopBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ListAltIcon from "@material-ui/icons/ListAlt";
import "./AdminHome.css";

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  heads: {
    margin: theme.spacing(2),
    minWidth: 350,
    marginLeft: "30px",
    textAlign: "center",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  buttonRoot: {
    background: "linear-gradient(45deg, #687732 30%, #7A8B39 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(60, 75, 120, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#859438"),
    backgroundColor: "#859438",
    "&:hover": {
      backgroundColor: "#848438",
    },
    // margin: theme.spacing(1),
  },
}))(Button);

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { redirect: null, isAuthenticated: false };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const { REACT_APP_GET_SESSION } = process.env;
    fetch(REACT_APP_GET_SESSION, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.login === true) {
          this.setState({ isAuthenticated: true });
        } else {
          this.setState({ redirect: <Redirect push to="/signin" /> });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout(d) {
    const { REACT_APP_LOGOUT } = process.env;
    fetch(REACT_APP_LOGOUT, {
      credentials: "include",
    })
      .then(() => {
        this.setState({ redirect: <Redirect push to="/signin" /> });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <TopBar />
          <br />
          {this.state.redirect}
          <h1 className={classes.heads}>
            <u>Welcome to the LEP Admin Home</u>
          </h1>
          <div className="wrapper">
            <ColorButton
              variant="contained"
              color="primary"
              style={{ height: 40 }}
              className={classes.margin}
              onClick={() =>
                this.setState({ redirect: <Redirect push to="/formpairs" /> })
              }
            >
              Form new pairs <GroupAddIcon />
            </ColorButton>
            <ColorButton
              variant="contained"
              color="primary"
              style={{ height: 40 }}
              className={classes.margin}
              onClick={() =>
                this.setState({ redirect: <Redirect push to="/paired" /> })
              }
            >
              Paired <GroupIcon />
            </ColorButton>
            <ColorButton
              variant="contained"
              color="primary"
              style={{ height: 40 }}
              className={classes.margin}
              onClick={() =>
                this.setState({ redirect: <Redirect push to="/unpaired" /> })
              }
            >
              Unpaired <PersonIcon />
            </ColorButton>
          </div>
          <div className="wrapper">
            <ColorButton
              variant="contained"
              color="primary"
              style={{ height: 40 }}
              className={classes.margin}
              onClick={() =>
                this.setState({ redirect: <Redirect push to="/studentlist" /> })
              }
            >
              Student List <ListAltIcon />
            </ColorButton>
            <ColorButton
              variant="contained"
              color="primary"
              style={{ height: 40 }}
              className={classes.margin}
              onClick={() =>
                this.setState({
                  redirect: <Redirect push to="/timesheetlogs" />,
                })
              }
            >
              Timesheet <AccessTimeIcon />
            </ColorButton>
            <ColorButton
              variant="contained"
              color="primary"
              style={{ height: 40 }}
              className={classes.margin}
              onClick={() =>
                this.setState({ redirect: <Redirect push to="/settings" /> })
              }
            >
              Settings <SettingsIcon />
            </ColorButton>
          </div>
          <div className="wrapper2">
            <ColorButton
              variant="contained"
              color="primary"
              style={{ height: 40 }}
              className={classes.margin}
              onClick={this.logout}
            >
              Logout <ExitToAppIcon />
            </ColorButton>
          </div>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Home);
