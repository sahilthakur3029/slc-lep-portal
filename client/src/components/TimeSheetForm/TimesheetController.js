import React, { Component } from "react";
import Timesheet from "./Timesheet";
import TimesheetSuccess from "./TimesheetSuccess";

class TimesheetController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      firstName: "",
      lastName: "",
      partnerNames: "",
      week: "",
      hours: "",
    };
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { firstName, lastName, partnerNames, week, hours } = this.state;
    const values = {
      firstName,
      lastName,
      partnerNames,
      week,
      hours,
    };
    switch (step) {
      case 1:
        return (
          <Timesheet
            handleChange={this.handleChange}
            nextStep={this.nextStep}
            values={values}
          />
        );
      case 2:
        return <TimesheetSuccess />;
      default:
        console.log("This is a multi-step form built with React.");
    }
  }
}

export default TimesheetController;
