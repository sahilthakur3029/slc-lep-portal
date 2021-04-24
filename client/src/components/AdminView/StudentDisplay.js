import React, { Component } from "react";
// import TopBar from "../IntakeForm/TopBar";
// import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormLabel from "@material-ui/core/FormLabel";

class StudentDisplay extends Component {
    constructor(props) {
      super(props);
      console.log("hello");
      this.state = {
        students: null,
      };
    }

    
    componentDidMount() {
      console.log("reached here");
      const { REACT_APP_NAMES } = process.env;
      fetch(REACT_APP_NAMES)
        .then((response) => response.json())
        .then((data) => {
          for (const stud_name of data) {
            console.log(stud_name)
            console.log(stud_name[0])
          }
          // console.log(typeof(data));
          // console.log(typeof(data[0][0]));
          // console.log(data[0][0]);
          this.setState({students: data}, () => {
          });
        })
        .catch((error) => console.log("Error", error));
    }
    continue = (e) => {
      e.preventDefault();
    };

    render() {
      const string_studs = this.state.students
      // console.log(typeof(string_studs));
      return(string_studs);
    };

    // handleClose = (e, reason) => {
    //   if (reason === "clickaway") {
    //     return;
    //   }
  
    //   // this.setState({ open: false });
    // };
    // render() {
    //   // props is the useStyles variable
    //   const { values, handleChange, classes } = this.props;
    //   return (
    //     <MuiThemeProvider>
    //       <>
    //       {/* Snackbar not required right? */}
    //         <Snackbar
    //           open={this.state.open}
    //           autoHideDuration={5000}
    //           onClose={() => this.setState({ open: false })}
    //         >
    //           <Alert onClose={this.handleClose} severity="error">
    //             Incorrect orienataion key
    //           </Alert>
    //         </Snackbar>
    //         <CssBaseline />
    //         <TopBar />
    //         <br />
    //         <h1 className={classes.heads}>
    //           LEP {this.state.semester} Intake Form
    //         </h1>
    //         <br />
    //         <h2 className={classes.formControl}>Basic Information</h2>
    //         <TextField
    //           placeholder="Enter Your First Name"
    //           label="First Name"
    //           onChange={handleChange("firstName")}
    //           defaultValue={values.firstName}
    //           margin="normal"
    //           required
    //           className={classes.formControl}
    //         />
    //         <TextField
    //           placeholder="Enter Your Last Name"
    //           label="Last Name"
    //           onChange={handleChange("lastName")}
    //           defaultValue={values.lastName}
    //           margin="normal"
    //           required
    //           className={classes.formControl}
    //         />
    //         <br />
    //         <TextField
    //           placeholder="Enter Your Email"
    //           label="Email"
    //           onChange={handleChange("email")}
    //           defaultValue={values.email}
    //           margin="normal"
    //           required
    //           className={classes.formControl}
    //         />
    //         <br />
    //         <TextField
    //           placeholder="Enter Your Student ID Number"
    //           label="SID"
    //           onChange={handleChange("sid")}
    //           defaultValue={values.sid}
    //           margin="normal"
    //           required
    //           className={classes.formControl}
    //         />
    //         <br />
    //         <FormControl className={classes.formControl} required>
    //           <InputLabel id="academic-title-label">Academic Title</InputLabel>
    //           <Select
    //             labelId="academic-title-label"
    //             id="academic-title"
    //             defaultValue={values.academicTitle}
    //             onChange={handleChange("academicTitle")}
    //           >
    //             <MenuItem value={"Undergraduate"}>Undergraduate</MenuItem>
    //             <MenuItem value={"Graduate"}>Graduate</MenuItem>
    //             <MenuItem value={"Staff"}>Staff</MenuItem>
    //             <MenuItem value={"Scholar"}>Scholar</MenuItem>
    //             <MenuItem value={"Alumnus"}>Alumnus</MenuItem>
    //           </Select>
    //         </FormControl>
    //         <FormControl className={classes.formControl} required>
    //           <InputLabel id="residency-label">Residency</InputLabel>
    //           <Select
    //             labelId="residency-label"
    //             id="residency"
    //             defaultValue={values.residency}
    //             onChange={handleChange("residency")}
    //           >
    //             <MenuItem value={"Domestic US"}>Domestic US</MenuItem>
    //             <MenuItem value={"International"}>International</MenuItem>
    //           </Select>
    //         </FormControl>
    //         <br />
    //         <TextField
    //           placeholder="Enter Your Major(s)"
    //           label="Major(s) - If multiple, seperate with commas"
    //           onChange={handleChange("major")}
    //           defaultValue={values.major}
    //           margin="normal"
    //           className={classes.formControl}
    //         />
    //         <br />
    //         <Tooltip
    //           title="We use the following information for the purposes of helping our staff use the most 
    //         respectful language when addressing you and giving you the option, as seen later in this form, 
    //         of preferring a partner with a particular gender."
    //           placement="top"
    //         >
    //           <FormControl className={classes.formControl}>
    //             <InputLabel id="gender-label">
    //               Gender <HelpIcon className={classes.questionMark}></HelpIcon>
    //             </InputLabel>
    //             <Select
    //               labelId="gender-label"
    //               id="gender"
    //               defaultValue={values.gender}
    //               onChange={handleChange("gender")}
    //             >
    //               <MenuItem value={"Male"}>Male</MenuItem>
    //               <MenuItem value={"Female"}>Female</MenuItem>
    //               <MenuItem value={"TransMale"}>TransMale</MenuItem>
    //               <MenuItem value={"TransFemale"}>TransFemale</MenuItem>
    //               <MenuItem value={"Genderqueer"}>Genderqueer</MenuItem>
    //               <MenuItem value={"Prefer Not To State"}>
    //                 Prefer Not To State
    //               </MenuItem>
    //               <MenuItem value={"Custom"}>Custom</MenuItem>
    //             </Select>
    //           </FormControl>
    //         </Tooltip>
    //         <TextField
    //           placeholder="Gender Custom"
    //           label="If Custom, please specify"
    //           onChange={handleChange("genderCustom")}
    //           defaultValue={values.genderCustom}
    //           margin="normal"
    //           className={classes.formControl}
    //         />
    //         <br />
    //         <FormControl className={classes.formControl}>
    //           <InputLabel id="days-label">Select All Available Days</InputLabel>
    //           <Select
    //             labelId="dow-label"
    //             id="dow"
    //             multiple
    //             value={values.availability}
    //             onChange={handleChange("availability")}
    //             input={<Input />}
    //             MenuProps={MenuProps}
    //           >
    //             {allDays.map((name) => (
    //               <MenuItem key={name} value={name}>
    //                 {name}
    //               </MenuItem>
    //             ))}
    //           </Select>
    //         </FormControl>
           
    //         <br />
    //       </>
    //     </MuiThemeProvider>
    //   );
    // }
  }
  
  export default StudentDisplay;
  