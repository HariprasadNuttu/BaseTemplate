// You can use CONSTANTS.js file for below definitions of constants and import here.
import callApi from "../../Api";
export const OPEN_LOADER = "OPEN_LOADER";
export const CLOSE_LOADER = "CLOSE_LOADER";

export const GET_DASHBOARD_DETAILS = "GET_DASHBOARD_DETAILS";


export const openLoader = (data) => ({
  type: OPEN_LOADER,
  payload: true,
});
export const closeLoader = (data) => ({
  type: CLOSE_LOADER,
  payload: false,
});

export const fetchDetails = (reqObj) => async (dispatch) => {
  dispatch(openLoader())
  const data = await callApi.get(`user/dashbaord`);
  if (data && data.data.success) {
    dispatch({ type: GET_DASHBOARD_DETAILS, payload: data.data.data });
    // ToastMessage(SUCCESS,data.messages.success);
    dispatch(closeLoader())
  }else{
    dispatch(closeLoader())
    // ToastMessage(ERROR,data.data.message);
  }
};
