import React from "react";
import Home from "./AdminHome";
import { makeStyles } from "@material-ui/core/styles";
import { PageButton } from "./Buttonss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TopBar from "../IntakeForm/TopBar";

const FormPairings = (props) => {
  return (
    <div>
      <TopBar />
      <ul>
        <li>
          <h3> All </h3>
        </li>
        <li>
          <h3> Unpaired Students </h3>
        </li>
      </ul>

      <Router>
        <div>
          <PageButton buttonName="Home" pageRoute="/home" />

          {/* A <Switch> looks through its children <Route>s and
                        renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/home">
              <Home name="Maya" />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default FormPairings;
