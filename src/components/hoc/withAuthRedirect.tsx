import React, { ComponentType } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Navigate } from "react-router-dom";

import { AppStateType } from "../../redux/redux-store";

const mapState = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

export function withAuthRedirect<WCP>(
  WrappedComponent: ComponentType<WCP & PropsFromRedux>
) {
  class RedirectComponent extends React.Component<PropsFromRedux> {
    render() {
      let { isAuth, ...restProps } = this.props;
      if (!isAuth) return <Navigate to="/login" />;
      return <WrappedComponent {...restProps as WCP & PropsFromRedux} />;
    }
  }

  const ConnectedRedirectComponent = connector(RedirectComponent);
  return ConnectedRedirectComponent;
}
