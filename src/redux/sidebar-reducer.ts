let initialState = {};

type ActionType = {
  type: string
  payload?: any
};

type InitialStateType = typeof initialState;

const sidebarReducer = (
  state = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    default:
      return state;
  }
};

export default sidebarReducer;
