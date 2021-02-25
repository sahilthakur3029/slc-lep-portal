import React, { Component } from "react";
import FormUserDetails from "./FormUserDetails";
import FormLanguageDetails from "./FormLanguageDetails";
import FormPartnerDetails from "./FormPartnerDetails";
import FormWaiver from "./FormWaiver";
import Confirm from "./Confirm";
import Success from "./Success";

class FormController extends Component {
  state = {
    step: 1,
    firstName: "",
    lastName: "",
    email: "",
    sid: "",
    academicTitle: "",
    residency: "",
    major: "",
    gender: "",
    genderCustom: "",
    availability: [],
    hopeToGain: "",
    planToMeet: "",
    occupation: "",
    city: "",
    bio: "",
    firstChoiceLearn: "",
    firstChoiceLearnOther: "",
    firstChoiceLearnLevel: "",
    secondChoiceLearn: "",
    secondChoiceLearnOther: "",
    secondChoiceLearnLevel: "",
    firstChoiceTeach: "",
    firstChoiceTeachOther: "",
    firstChoiceTeachLevel: "",
    secondChoiceTeach: "",
    secondChoiceTeachOther: "",
    secondChoiceTeachLevel: "",
    comments: "",
    preferredMajor: "",
    preferredMajorWeight: "",
    preferredGender: "",
    preferredGenderCustom: "",
    preferredGenderWeight: "",
    waiverAccept: "",
    orientationKey: "",
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // Proceed to next step (and checks orienation key first)
  nextStepOrientationCheck = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
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
      email,
      sid,
      academicTitle,
      residency,
      major,
      gender,
      genderCustom,
      availability,
      hopeToGain,
      planToMeet,
      firstChoiceLearn,
      firstChoiceLearnOther,
      firstChoiceLearnLevel,
      secondChoiceLearn,
      secondChoiceLearnOther,
      secondChoiceLearnLevel,
      firstChoiceTeach,
      firstChoiceTeachOther,
      firstChoiceTeachLevel,
      secondChoiceTeach,
      secondChoiceTeachOther,
      secondChoiceTeachLevel,
      comments,
      preferredMajor,
      preferredMajorWeight,
      preferredGender,
      preferredGenderCustom,
      preferredGenderWeight,
      waiverAccept,
      orientationKey,
    } = this.state;
    const values = {
      firstName,
      lastName,
      email,
      sid,
      academicTitle,
      residency,
      major,
      gender,
      genderCustom,
      availability,
      hopeToGain,
      planToMeet,
      firstChoiceLearn,
      firstChoiceLearnOther,
      firstChoiceLearnLevel,
      secondChoiceLearn,
      secondChoiceLearnOther,
      secondChoiceLearnLevel,
      firstChoiceTeach,
      firstChoiceTeachOther,
      firstChoiceTeachLevel,
      secondChoiceTeach,
      secondChoiceTeachOther,
      secondChoiceTeachLevel,
      comments,
      preferredMajor,
      preferredMajorWeight,
      preferredGender,
      preferredGenderCustom,
      preferredGenderWeight,
      waiverAccept,
      orientationKey,
    };

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <FormLanguageDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <FormPartnerDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <FormWaiver
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 5:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 6:
        return <Success />;
      default:
        console.log("This is a multi-step form built with React.");
    }
  }
}

export default FormController;
