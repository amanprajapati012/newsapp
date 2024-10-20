import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 8;
  apiKey = process.env.REACT_APP_NEWS_API;

  state = { progress: 0 };

  setProgress = (progress) => this.setState({ progress });

  render() {
    return (
      <Router>
        <NavBar />
        <LoadingBar height={3} color="#f11946" progress={this.state.progress} />
        <Routes>
          {["/", "/home", "/business", "/entertainment", "/general", "/health", "/science", "/sports", "/technology"].map((path) => (
            <Route
              exact
              path={path === "/" ? "/" : `/${path}`}
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  key={path}
                  category={path.replace("/", "") || "general"}
                  pageSize={this.pageSize}
                />
              }
              key={path}
            />
          ))}
        </Routes>
      </Router>
    );
  }
}





