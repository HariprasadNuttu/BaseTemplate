// You can use CONSTANTS.js file for below definitions of constants and import here.
import callApi from "../../Api";
import { push } from "react-router-redux";
import { ToastMessage, SUCCESS, ERROR } from "../../common/ToastMessage";
export const UPDATE_USER = "UPDATE_USER";
export const UN_AUTHENTICATED = "UN_AUTHENTICATED";
export const SIGN_UP_USER = "SIGN_UP_USER";
export const OPEN_LOADER = "OPEN_LOADER";
export const CLOSE_LOADER = "CLOSE_LOADER";

export const openLoader = (data) => ({
  type: OPEN_LOADER,
  payload: true,
});
export const closeLoader = (data) => ({
  type: CLOSE_LOADER,
  payload: false,
});

export const updateUserAction = (user) => ({
  type: UPDATE_USER,
  payload: { ...user },
});
export const updateUnAuthentication = (user) => ({
  type: UN_AUTHENTICATED,
  payload: { ...user },
});

export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch(openLoader());
    const data = await callApi.post("auth/sign_in", user);
    console.log("Uer Asdfasdfasdf",data)
    if (data.data.success) {
      dispatch(closeLoader());
      // localStorage.setItem("Authentication_Token", data.data.meta.jwt_token);
      const userObj = {
        ...data.data.data,
      };
      dispatch(updateUserAction(userObj));
      dispatch(push("/dashboard"));
      ToastMessage(SUCCESS, data.data.message);
    } else {
      ToastMessage(ERROR, data.data.message);
      dispatch(closeLoader());
    }
  } catch (error) {
    console.log("Error message",error)
    ToastMessage(ERROR, error);
    dispatch(closeLoader());
  }
};

export const getProfileDetails = () => async (dispatch) => {
  // dispatch(openLoader());
  // const authToken = localStorage.getItem("Authentication_Token");
  // if (authToken) {
    const data = await callApi.get("user/profile_details");
    if (data && data.data.success) {
      // localStorage.setItem("Authentication_Token", data.data.meta.jwt_token);
      const userObj = {
        ...data.data.data,
        // client_id: data.data.meta.client_id,
      };
      dispatch(updateUserAction(userObj));
      // dispatch(closeLoader());
    } else {
      // dispatch(closeLoader());
      // ToastMessage(ERROR,data.data.message);
    }
  // }
};

export const redirectToLogin = () => async (dispatch) => {
  dispatch(
    updateUnAuthentication({
      isAuthenticated: false,
      userDetails: {},
    })
  );
};

export const createUser = (userData) => async (dispatch) => {
  try {
    dispatch(openLoader());
    const data = await callApi.post("auth/signUp", userData);
    console.log("Data details",data)
    if (data.data.success) {
      ToastMessage(SUCCESS, data.data.message);
      dispatch(closeLoader());
      dispatch(push("/login"));
    }
  } catch (error) {
    ToastMessage(ERROR, error);
    dispatch(closeLoader());
  }
};

export const userAvailability = (userData) => async (dispatch) => {
  const data = await callApi.get("users/email_availability", {
    params: userData,
  });
  if (data.data.success) {
    ToastMessage(SUCCESS, data.data.message);
  } else {
    ToastMessage(ERROR, data.data.message);
  }
};

export const resetPassword = (userData) => async (dispatch) => {
  dispatch(openLoader());
  const data = await callApi.post("users/reset_password", userData);
  if (data.data.success) {
    ToastMessage(SUCCESS, data.data.message);
    dispatch(closeLoader());
    dispatch(push("/login"));
  } else {
    ToastMessage(ERROR, data.data.message);
    dispatch(closeLoader());
  }
};

export const forgotPassword = (userData) => async (dispatch) => {
  dispatch(openLoader());
  const data = await callApi.post("users/forgot_password", userData);
  if (data.data.success) {
    dispatch(push("/login"));
    ToastMessage(SUCCESS, data.data.message);
    dispatch(closeLoader());
  } else {
    ToastMessage(ERROR, data.data.message);
    dispatch(closeLoader());
  }
};

export const inviteUser = (userData) => async (dispatch) => {
  dispatch(openLoader());
  const data = await callApi.post(
    `users/invite_user`,
    userData
  );
  if (data.data.success) {
    ToastMessage(SUCCESS, data.data.messages.success[0]);
    dispatch(closeLoader());
  } else {
    ToastMessage(ERROR, data.data.message);
    dispatch(closeLoader());
  }
};
