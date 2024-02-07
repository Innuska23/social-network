import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { getAuthUserData } from "./redux/auth-reducer";

class App extends Component {
  componentDidMount() {
    this.props.getAuthUserData();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className="app-wrapper-content">
            <Routes>
              <Route path="/dialogs/*" element={<DialogsContainer />} />
              <Route path="/profile/*" element={<ProfileContainer />} />
              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/news" />
              <Route path="/music" />
              <Route path="/settings" />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const AppWithAuth = connect(null, { getAuthUserData })(App);

export default AppWithAuth;
