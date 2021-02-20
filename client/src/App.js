import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import FormController from "./components/IntakeForm/FormController";
import Home from "./components/Home";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { REACT_APP_TEST } = process.env;
    fetch(REACT_APP_TEST)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log("Erorr", error));
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/intakeform" component={FormController} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
