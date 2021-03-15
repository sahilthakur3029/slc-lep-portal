import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Unpaired from "./Unpaired";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #687732 30%, #7A8B39 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(60, 75, 120, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

export const PageButton = (props) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.root}
      onClick={(event) => (window.location.href = props.pageRoute)}
    >
      {props.buttonName}
    </Button>
  );
};
