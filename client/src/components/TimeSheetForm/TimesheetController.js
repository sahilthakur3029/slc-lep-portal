import React, { Component } from "react";
import Timesheet from "./Timesheet";

class TimesheetController extends Component {
  state = {
    firstName: "",
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { firstName } = this.state;
    const values = {
      firstName,
    };
    return <Timesheet handleChange={this.handleChange} values={values} />;
  }
}

export default TimesheetController;
