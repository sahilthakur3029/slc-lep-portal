import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-start",
    color: "#C4820E",
    padding: "0.5%",
  },
  topBar: {
    backgroundColor: "#003262",
  },
});

class TopBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.topBar} position="static">
          <Typography className={classes.title} variant="h4" noWrap>
            Student Learning Center
          </Typography>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(useStyles)(TopBar);
