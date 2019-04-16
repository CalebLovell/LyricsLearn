import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  login = async () => {
    const { email, password } = this.state;
    try {
      const result = await axios.post("/auth/login", {
        email,
        password
      });
      if (result.data.loggedIn) {
        this.props.history.push("/profile");
      } else {
        alert(`Login failed. User not logged in.`);
      }
    } catch (err) {
      console.log(`You got an error: ${err}`);
    }
  }

  render() {
    return (
      <div className="login-form">
        <div className="input-container">
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
          <button onClick={() => this.login()}>Login</button>
        </div>
      </div>
    );
  }
}

export default Login;
