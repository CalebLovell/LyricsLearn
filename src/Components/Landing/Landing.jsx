import React, { Component } from "react";
import { Link } from "react-router-dom";
import 

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>Landing</h1>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        <Link to="/signup">
          <button>Login</button>
        </Link>
      </div>
    );
  }
}

export default Landing;
