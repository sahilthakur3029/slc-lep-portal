import React, { Component } from "react";
import Timesheet from "./Timesheet";
import TimesheetSuccess from "./TimesheetSuccess";

class TimesheetController extends Component {
  state = {
    step: 1,
    firstName: "",
    lastName: "",
    sid: "",
    partnerNames: "",
    week: "",
    hours: "",
    allWeeks: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    calendarLink: "bit.ly/slc-sp21",
    semester: "Spring 2021",
  };

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
    const {
      firstName,
      lastName,
      sid,
      partnerNames,
      weeks,
      hours,
      allWeeks,
      calendarLink,
      semester,
    } = this.state;
    const values = {
      firstName,
      lastName,
      sid,
      partnerNames,
      weeks,
      hours,
      allWeeks,
      calendarLink,
      semester,
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
