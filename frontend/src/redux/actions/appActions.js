export const SIGN_UP_USER = "SIGN_UP_USER";
export const OPEN_LOADER = "OPEN_LOADER";
export const CLOSE_LOADER = "CLOSE_LOADER";

export const signUpUserAction = (payload) => ({
  type: SIGN_UP_USER,
  payload
});


export const signUpUser = (user) => {
  return (dispatch) => {
    dispatch(signUpUserAction(user));
  };
};
