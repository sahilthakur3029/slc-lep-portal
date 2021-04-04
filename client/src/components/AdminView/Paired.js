import React from "react";
import Home from "./AdminHome";
import { withStyles } from "@material-ui/core/styles";
import { PageButton } from "./Buttonss";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TopBar from "../IntakeForm/TopBar";
import // State or Local Processing Plugins
"@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

const columns = [
  { name: "partner1", title: "Partner 1" },
  { name: "partner2", title: "Partner 2" },
  { name: "language1", title: "Language 1" },
  { name: "language2", title: "Language 2" }
];
const rows = [
  { partner1: "Riddhi", partner2: "Sahil", language1: "Mandarin", language2: "German" },
  { partner1: "Sahil", partner2: "Thakur", language1: "French", language2: "Korean" },
  { partner1: "Sarah", partner2: "Bui", language1: "Mandarin", language2: "Russian" },
  { partner1: "Alex", partner2: "Kassil", language1: "Dutch", language2: "Spanish" },
  { partner1: "Thomas", partner2: "Boatright", language1: "Hindi", language2: "Spanish" }
];

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  heads: {
    color: "black",
    textAlign: "center",
    fontSize: 35,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  tableClass: {
    backgroundColor: "red",
    color: "blue",
  }
});

const Paired = (props) => {
  return (
    <div>
      <TopBar />

      <h1 className={props.classes.heads}>
            Pairs
          </h1>
  <Grid rows={rows} columns={columns}>
      <Table className={props.classes.tableClass}/>
      <TableHeaderRow />
    </Grid>

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

export default withStyles(useStyles)(Paired);
