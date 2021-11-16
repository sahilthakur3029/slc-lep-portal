import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import HeaderImg from "./test6.png";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 3,
    alignSelf: "flex-start",
    color: "#C4820E", //#C4820E
    padding: "0.5%",
    margin: "6% 3% 5% 2%",
    // border: "solid #003262 2px",
    // backgroundColor: "#003262",
    fontSize: "1px",
    // borderRadius: "2px",
  },
  topBar: {
    backgroundImage: `url(${HeaderImg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center ",
    backgroundSize: "cover",
    maxWidth: "100%",
    // backgroundAttachment: "fixed",
    height: "100%",
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
