import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css"

class Landing extends Component {
  render() {
    return (
      <div className="landing-page">
        <h1>Landing</h1>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    );
  }
}

export default Landing;
