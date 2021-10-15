import React, { Component } from "react";
import FormUserDetails from "./FormUserDetails";
import FormLanguageDetails from "./FormLanguageDetails";
import FormPartnerDetails from "./FormPartnerDetails";
import FormWaiver from "./FormWaiver";
import Confirm from "./Confirm";
import Success from "./Success";
import FormOrientationKey from "./FormOrientationKey";

// Controls the form, displaying the next and previous buttons
// and controlling which page shows since it is a multi page form

// Initial State
class FormController extends Component {
  state = {
    step: 1,
    firstName: "",
    lastName: "",
    email: "",
    academicTitle: "",
    residency: "",
    major: "",
    gender: "",
    genderCustom: "",
    availability: [],
    hopeToGain: "",
    planToMeet: "",
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

  // Rendering the values that were given to each blank
  render() {
    const { step } = this.state;
    const {
      firstName,
      lastName,
      email,
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

    // Different pages of the form, values are all the variables
    // FormUserDetails, FormLanguageDetails decide wht goes on each page
    switch (step) {
      case 1:
        return (
          <FormOrientationKey
            handleChange={this.handleChange}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 2:
        return (
          <FormUserDetails
            handleChange={this.handleChange}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 3:
        return (
          <FormLanguageDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <FormPartnerDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 5:
        return (
          <FormWaiver
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 6:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 7:
        return <Success />;
      default:
        console.log("This is a multi-step form built with React.");
    }
  }
}

export default FormController;
