import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import Button from "@material-ui/core/Button";

export class Confirm extends Component {
  continue = (e) => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: {
        firstName,
        lastName,
        email,
        sid,
        academicTitle,
        residency,
        major,
        majorWeight,
        gender,
        genderWeight,
        hobbies,
        availability,
        occupation,
        city,
        bio,
      },
    } = this.props;
    return (
      <MuiThemeProvider>
        <>
          {/* <Dialog
            open
            fullWidth
            maxWidth='sm'
          > */}
          <AppBar title="Confirm User Data" />
          <List>
            <ListItem>
              <ListItemText primary="First Name" secondary={firstName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Last Name" secondary={lastName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="SID" secondary={sid} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Academic Title"
                secondary={academicTitle}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Residency" secondary={residency} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Major" secondary={major} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Major Weight" secondary={majorWeight} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Gender" secondary={gender} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Gender Weight" secondary={genderWeight} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Hobbies" secondary={hobbies.join(", ")} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Occupation" secondary={occupation} />
            </ListItem>
            <ListItem>
              <ListItemText primary="City" secondary={city} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Bio" secondary={bio} />
            </ListItem>
          </List>
          <br />

          <Button color="secondary" variant="contained" onClick={this.back}>
            Back
          </Button>

          <Button color="primary" variant="contained" onClick={this.continue}>
            Confirm & Continue
          </Button>
          {/* </Dialog> */}
        </>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
