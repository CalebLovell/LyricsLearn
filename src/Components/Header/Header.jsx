import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserData, killUser } from "./../../ducks/userReducer";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Header.scss";

class Header extends Component {
  componentDidMount() {
    this.props.getUserData();
  }

  logout = () => {
    axios.get("/auth/logout");
  };

  render() {
    const { id, image } = this.props.user;
    return (
      <header>
        <div className="header-container">
          <ul className="site-nav">
            <Link to="/">
              <li>Home</li>
            </Link>
            <div className="divider-line" />
            {!id ? (
              <>
                <Link to="/login">
                  <li>Login</li>
                </Link>
                <Link to="/signup">
                  <li>Sign Up</li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile">
                  <li>Profile</li>
                </Link>
                <Link to="/add">
                  <li>Add</li>
                </Link>
                <Link to="/" onClick={() => this.props.killUser()}>
                  <li>Logout</li>
                </Link>
                <Link to="/profile">
                  <div className="profile-pic">
                    <img src={`${image}`} alt="profile pic" />
                  </div>
                </Link>
              </>
            )}
          </ul>
          <Link to="/">
            <div className="logo">
              {/* <img src="https://via.placeholder.com/150" alt="site logo" /> */}
              <h1>LyricsLog</h1>
            </div>
          </Link>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search songs by title, artist, or language"
            />
          </div>
        </div>
      </header>
    );
  }
}

const mapState = reduxState => reduxState;

export default connect(
  mapState,
  { getUserData, killUser }
)(Header);
