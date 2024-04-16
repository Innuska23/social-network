import { connect } from "react-redux";
import { compose } from "redux";

import { actions } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { AppStateType } from "../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => ({
  dialogsPage: state.dialogsPage,
  newMessageText: state.dialogsPage.newMessageText,
});

const connector = connect(mapStateToProps, { ...actions });

const enhanceDialogs = compose<React.ComponentType>(
  connector,
  withAuthRedirect
);

export default enhanceDialogs(Dialogs) as React.ComponentType<any>;
