import React from "react";
import Paired from "./Paired";
import Button from "./Paired";
import Unpaired from "./Unpaired";
import FormPairings from "./FormPairings";
import { makeStyles } from "@material-ui/core/styles";
import { PageButton } from "./Buttonss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TopBar from "../IntakeForm/TopBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const Home = (props) => {
  return (
    <MuiThemeProvider>
      <>
        <div>
          <TopBar />
          <h1>Home</h1>
          <p>Welcome to the SLC, {props.name}</p>
        </div>

        <Router>
          <PageButton buttonName="Unpaired" pageRoute="/unpaired" />
          <PageButton buttonName="Paired" pageRoute="/paired" />
          <PageButton buttonName="Form new pairs" pageRoute="/formpairs" />
        </Router>
      </>
    </MuiThemeProvider>
  );
};

export default withStyles(useStyles)(Home);
