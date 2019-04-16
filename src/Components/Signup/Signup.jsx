import React, { Component } from "react";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      image: ""
    };
  }

  async signup() {
    const { first_name, last_name, email, password, image } = this.state;
    const res = await axios.post("/auth/signup", {
      first_name,
      last_name,
      email,
      password,
      image
    });
    if (res.data.loggedIn) {
      this.props.history.push("/profile");
    } else {
      alert(`registration failed`);
    }
  }

  render() {
    return (
      <div className="signup-form">
        <div className="input-container">
          <input
            onChange={e => this.setState({ first_name: e.target.value })}
            value={this.state.first_name}
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={e => this.setState({ last_name: e.target.value })}
            value={this.state.last_name}
            type="text"
            placeholder="Last Name"
          />
          <input
            onChange={e => this.setState({ email: e.target.value })}
            value={this.state.email}
            type="text"
            placeholder="Email Address"
          />
          <input
            onChange={e => this.setState({ password: e.target.value })}
            value={this.state.password}
            type="password"
            placeholder="Password"
          />
          <input
            onChange={e => this.setState({ image: e.target.value })}
            value={this.state.image}
            type="text"
            placeholder="Profile Picture"
          />
        </div>
        <button onClick={() => this.signup()}>Sign Up</button>
      </div>
    );
  }
}

export default Signup;
