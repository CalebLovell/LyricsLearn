import React, { Component } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Routes from "./routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Header />
          {Routes}
          <Footer />
        </HashRouter>
      </div>
    );
  }
}

export default App;
