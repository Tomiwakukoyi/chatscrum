import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Chatscrum</h1>
      <div className="Home">
        <h4>
          <Link to="/signup ">Sign Up</Link>
        </h4>
        <h4>
          <Link to="/signin">Sign In</Link>
        </h4>
      </div>
    </div>
  );
};

export default Home;
