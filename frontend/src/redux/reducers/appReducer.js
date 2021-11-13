import { SIGN_UP_USER } from "../actions/appActions";

const initialState = {
  signUpUserRole: null,
};

export const appReducer = (state=initialState, action) => {
  switch (action.type) {
    case SIGN_UP_USER:
      return {
        ...state,
        signUpUserRole: action.payload,
      };
    default:
      return state;
  }
};
