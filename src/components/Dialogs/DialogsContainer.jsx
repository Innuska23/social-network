import {
  addMessageActionCreator,
  updateNewMessageActionCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    newMessageText: state.dialogsPage.newMessageText,
  };
};

let mapDispatchToProps = (dispatch, state) => {
  return {
    updateNewMessageAction: (message) => {
      dispatch(updateNewMessageActionCreator(message));
    },
    sendMessage: () => {
      dispatch(addMessageActionCreator());
    },
    newMessageText: state.newMessageText,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
