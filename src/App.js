import React from "react";
import "./App.css";
import Home from "./components/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./components/sign-up/Signup";
import Signin from "./components/sign-in/Signin";
import Scrumboard from "./components/scrumboard/Scrumboard";

class App extends React.Component {
  render() {
    return (
      //linking components to eachother on the SPA
      //Always wrap the code with browserrouter
      <BrowserRouter>
        <div className="App">
          {/* always wrap the route with routes first because of the new react
          version update */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/scrumboard" element={<Scrumboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
