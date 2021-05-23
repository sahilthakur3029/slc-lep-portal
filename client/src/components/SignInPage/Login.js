import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  content: {
    textAlign: "center",
    marginTop: 40,
  },
}));

export function Login(props) {
  const classes = useStyles();
  const [loginError, setLoginError] = useState(false);

  function loginSuccess(d) {
    // Log into backend with the ID token as credential:
    async function complete_auth() {
      var formData = new FormData();
      formData.set("id_token", d.tokenObj.id_token);
      try {
        console.log("CALLED LOGIN FRONTEND");
        console.log(formData);
        const r = await axios.post("http://localhost:5000/me", formData);
        console.log(r);
        console.log("AFTER POST REQUEST");
        console.log("ROUND 2");
        const b = await axios.get("http://localhost:5000/me");
        console.log(b);
        props.setAuthRequired(false);
      } catch (e) {
        console.log("FAILED WITH TOKEN");
        setLoginError(true);
      }
    }

    complete_auth();
  }
  function loginFailure(d) {
    console.log("FAILED");
    // console.log(d.tokenObj.id_token);
    setLoginError(true);
  }

  // Redirect if authentication is done:
  if (!props.authRequired) return <Redirect to="/" />;

  return (
    <div className={classes.content}>
      <Typography variant="h5" gutterBottom={true}>
        Please log in to use the Hello app.
      </Typography>
      {console.log("RENDERED")}
      <GoogleLogin
        clientId="400000931739-oqett115tft12ja9u5lehnimqu87bebd.apps.googleusercontent.com"
        buttonText="Log in with Google"
        onSuccess={loginSuccess}
        onFailure={loginFailure}
        g
        cookiePolicy={"single_host_origin"}
        redirectUri="postmessage"
        scope="openid"
      />
      <Snackbar
        open={loginError}
        autoHideDuration={10000}
        onClose={() => setLoginError(false)}
      >
        <Alert elevation={6} severity="error" variant="filled">
          Error logging in
        </Alert>
      </Snackbar>
    </div>
  );
}
