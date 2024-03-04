import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import { Provider } from "react-redux";
import store from "./redux/redux-store";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);
const Login = React.lazy(() => import("./components/Login/Login"));

class App extends Component {
  catchAllUnhandledErrors = (reason, promise) => {
    alert("Some error occured");
    // console.error(promiseRejectionEvent);
  };
  componentDidMount() {
    if (!this.props.initialized) {
      this.props.initializeApp();
      window.addEventListener(
        "unhandledrejection",
        this.catchAllUnhandledErrors
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <BrowserRouter>
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className="app-wrapper-content">
            <Routes>
              <Route
                path="/dialogs/*"
                element={
                  <React.Suspense fallback={<Preloader />}>
                    <DialogsContainer />
                  </React.Suspense>
                }
              />
              <Route
                path="/"
                element={
                  <React.Suspense fallback={<Preloader />}>
                    <Navigate to="/profile" />
                  </React.Suspense>
                }
              />
              <Route
                path="/profile/*"
                element={
                  <React.Suspense fallback={<Preloader />}>
                    <ProfileContainer />
                  </React.Suspense>
                }
              />

              <Route
                path="/profile/:userId?"
                element={
                  <React.Suspense fallback={<Preloader />}>
                    <ProfileContainer />
                  </React.Suspense>
                }
              />
              <Route
                path="/login"
                element={
                  <React.Suspense fallback={<Preloader />}>
                    <Login />
                  </React.Suspense>
                }
              />
              <Route path="/news" />
              <Route path="/music" />
              <Route path="/settings" />
              <Route
                path="/users"
                element={<UsersContainer pageTitle={"Самурай"} />}
              />
              <Route
                path="*"
                element={
                  <React.Suspense fallback={<Preloader />}>
                    <Navigate to="/login" />
                  </React.Suspense>
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app ? state.app.initialized : false,
});

const AppWithAuth = connect(mapStateToProps, { initializeApp })(App);

const AppWithStore = () => (
  <Provider store={store}>
    <AppWithAuth />
  </Provider>
);

export default AppWithStore;
