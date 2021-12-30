import * as React from "react";
import { Component } from "react";
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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActionArea } from "@material-ui/core";
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
            <Card
              style={{
                maxWidth: "25%",
                height: "5%",
                backgroundColor: "#859438",
              }}
            >
              <CardActionArea
                onClick={() =>
                  this.setState({
                    redirect: <Redirect push to="/formpairs" />,
                  })
                }
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    Form Pairs <GroupAddIcon />
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    Run the pairing algorithm to match students
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              style={{
                maxWidth: "25%",
                height: "5%",
                backgroundColor: "#859438",
              }}
            >
              <CardActionArea
                onClick={() =>
                  this.setState({
                    redirect: <Redirect push to="/paired" />,
                  })
                }
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    Paired <GroupIcon />
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    All currently active language pairs and trios
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              style={{
                maxWidth: "25%",
                height: "5%",
                backgroundColor: "#859438",
              }}
            >
              <CardActionArea
                onClick={() =>
                  this.setState({
                    redirect: <Redirect push to="/unpaired" />,
                  })
                }
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    Unpaired <PersonIcon />
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    All students not paired during the last algorithm run
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
          <div className="wrapper">
            <Card
              style={{
                maxWidth: "25%",
                height: "5%",
                backgroundColor: "#859438",
              }}
            >
              <CardActionArea
                onClick={() =>
                  this.setState({
                    redirect: <Redirect push to="/studentlist" />,
                  })
                }
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    Student List <ListAltIcon />
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    All students who filled out the intake form
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              style={{
                maxWidth: "25%",
                height: "5%",
                backgroundColor: "#859438",
              }}
            >
              <CardActionArea
                onClick={() =>
                  this.setState({
                    redirect: <Redirect push to="/timesheetlogs" />,
                  })
                }
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    Timesheet <AccessTimeIcon />
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    Weekly logged conversational hours
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              style={{
                maxWidth: "25%",
                height: "5%",
                backgroundColor: "#859438",
              }}
            >
              <CardActionArea
                onClick={() =>
                  this.setState({
                    redirect: <Redirect push to="/settings" />,
                  })
                }
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    Settings <SettingsIcon />
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    Change configurations, download data, and reset application
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
          <div className="wrapper2">
            <Card
              style={{
                maxWidth: "25%",
                height: "5%",
                backgroundColor: "#859438",
              }}
            >
              <CardActionArea onClick={this.logout}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    Logout <ExitToAppIcon />
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{ textAlign: "center", color: "white" }}
                  >
                    Logout of SLC Admin Portal
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Home);
