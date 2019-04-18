import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Auth.css";

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
  };

  render() {
    return (
      <div className="auth-page">
        <div className="form">
          <div className="h4-div">
            <h4>LOG IN</h4>
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
          <button onClick={() => this.login()}>Login</button>
          <Link to="/signup">
            <p>Click here to create an account!</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
