import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import FormController from "./components/IntakeForm/FormController";
import Home from "./components/Home";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import TimesheetController from "./components/TimesheetForm/TimesheetController";
import AdminHome from "./components/AdminView/AdminHome";
import Paired from "./components/AdminView/Paired";
import Unpaired from "./components/AdminView/Unpaired";
import FormPairings from "./components/AdminView/FormPairings";
import SignIn from "./components/SignInPage/SignIn";

import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

/* Material UI imports */
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

/* Other libraries */
import axios from "axios";

/* Application imports */
import { ProfileButton } from "./components/SignInPage/ProfileButton";
import { Login } from "./components/SignInPage/Login";
import { Hello } from "./components/SignInPage/Hello";

axios.defaults.headers.common["X-Requested-With"] = "XmlHttpRequest";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#ffffff", //"#e6efee",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const ProtectedRoute = ({ children, authRequired, ...rest }) => {
  return (
    <Route {...rest}>
      {!authRequired ? children : <Redirect to="/login" />}
    </Route>
  );
};

function App(props) {
  const classes = useStyles();

  /* Is authentication required? */
  const [authRequired, setAuthRequired] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [logoutError, showLogoutError] = useState(false);

  /* For logout  */
  function handleLogout() {
    async function do_logout() {
      try {
        const result = await axios.delete("http://localhost:5000/me");
        if (result.status === 200 || result.status === 204) {
          setAuthRequired(true);
        }
      } catch (e) {
        showLogoutError(true);
      }
    }
    do_logout();
  }

  useEffect(() => {
    async function fetchData() {
      if (!authRequired) {
        try {
          const r = await axios.get("http://localhost:5000/me");
          setProfilePicture(r.data.picture);
        } catch (e) {
          if (e.response) {
            if (e.response.status === 401) {
              setAuthRequired(true);
            }
          }
        }
      } else {
        setProfilePicture(null);
      }
    }

    fetchData();
  }, [authRequired]);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" variant="h6" className={classes.title}>
            The Hello App
          </Typography>
          <ProfileButton
            handleLogout={handleLogout}
            authenticated={!authRequired}
            profilePicture={profilePicture}
          />
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login
              authRequired={authRequired}
              setAuthRequired={setAuthRequired}
              clientId="400000931739-oqett115tft12ja9u5lehnimqu87bebd.apps.googleusercontent.com"
            />
          </Route>
          <ProtectedRoute authRequired={authRequired} path="/">
            <Hello setAuthRequired={setAuthRequired} />
          </ProtectedRoute>
          <Route exact path="/intakeform" component={FormController} />
          <Route exact path="/timesheet" component={TimesheetController} />
          <Route exact path="/adminhome" component={AdminHome} />
          <Route exact path="/paired" component={Paired} />
          <Route exact path="/unpaired" component={Unpaired} />
          <Route exact path="/formpairs" component={FormPairings} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </BrowserRouter>
      <Snackbar
        open={logoutError}
        autoHideDuration={10000}
        onClose={() => showLogoutError(false)}
      >
        <Alert variant="filled" elevated={6} severity="error">
          Couldn't log out
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
