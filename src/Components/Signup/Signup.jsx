import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Login/Auth.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      image: ""
    };
  }

  signup = async () => {
    const { name, email, password, image } = this.state;
    try {
      const result = await axios.post("/auth/signup", {
        name,
        email,
        password,
        image
      });
      if (result.data.loggedIn) {
        this.props.history.push("/profile");
      } else {
        alert(`Sign up failed. User not logged in.`);
      }
    } catch (err) {
      console.log(`You got an error: ${err}`);
    }
  };

  render() {
    return (
      <div className="auth-page">
        <div className="form">
          <div className="h4-div">
            <h4>SIGN UP</h4>
          </div>
          <div className="input-slot">
            <i class="fa fa-user icon" />
            <input
              onChange={e => this.setState({ name: e.target.value })}
              value={this.state.name}
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="input-slot">
            <i class="fa fa-envelope icon" />
            <input
              onChange={e => this.setState({ email: e.target.value })}
              value={this.state.email}
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="input-slot">
            <i class="fa fa-key icon" />
            <input
              onChange={e => this.setState({ password: e.target.value })}
              value={this.state.password}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="input-slot">
            <i class="fa fa-camera icon" />
            <input
              onChange={e => this.setState({ image: e.target.value })}
              value={this.state.image}
              type="text"
              placeholder="Profile Picture"
            />
          </div>
          <button onClick={() => this.signup()}>Sign Up</button>
          <Link to="/login">
            <p>Click here if you already have an account!</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default Signup;
