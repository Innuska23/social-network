import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, { AppStateType } from "./redux/redux-store";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

import "./App.css";

const DialogsContainer = React.lazy(() =>
  import('./components/Dialogs/DialogsContainer')
);

const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);

const Login = React.lazy(() => import("./components/Login/Login"));

type AppPropsType = {
  initialized: boolean;
  initializeApp: () => void;
};

class App extends Component<AppPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
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

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app ? state.app.initialized : false,
});

const AppWithAuth = connect(mapStateToProps, { initializeApp })(App);

const AppWithStore = () => (
  <Provider store={store}>
    <AppWithAuth />
  </Provider>
);

export default AppWithStore;
