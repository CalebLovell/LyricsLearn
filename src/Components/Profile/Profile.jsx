import React, { Component } from "react";
import { Link } from "react-router-dom";

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>Profile</h1>
        <Link to="/add">
          <button>Add a Song</button>
        </Link>
      </div>
    );
  }
}

export default Profile;
