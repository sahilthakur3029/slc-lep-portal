import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import HeaderImg from "./LEP_header.png";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 3,
    alignSelf: "flex-start",
    padding: "0.5%",
    margin: "50% 2% 5% 2%",
    fontSize: "1px",
  },
  topBar: {
    backgroundImage: `url(${HeaderImg})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    // backgroundColor: "#003262", // "#003262",
    // backgroundImage: "url(test_img.png)",
  },
});

class TopBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.topBar} position="static">
          <Typography className={classes.title} variant="h4" noWrap>
            .
          </Typography>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(useStyles)(TopBar);
