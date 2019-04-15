import React, { Component } from "react";

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

  render() {
    return (
      <div>
        <div className="signup-form">
          <p>
            <span>Email:</span>
            <input
              onChange={e => this.setState({ email: e.target.value })}
              value={this.state.email}
              type="text"
            />
          </p>
          <p>
            <span>Password:</span>
            <input
              onChange={e => this.setState({ password: e.target.value })}
              value={this.state.password}
              type="password"
            />
          </p>
        </div>
      </div>
    );
  }
}

export default Signup;
