import {store} from './redux/store';
import axios from "axios";
import { redirectToLogin } from "./redux/actions/userActions";
import { ERROR, ToastMessage } from './common/ToastMessage';

const callApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
   withCredentials: true 
});

callApi.interceptors.request.use(
  function (config) {
    config.headers.authentication_token = localStorage.getItem("Authentication_Token")
    return config;
  },
  function (error) {
    console.log("request fails with error", error.message);
    return Promise.reject(error);
  }
);

callApi.interceptors.response.use(
  function (res) {
    return res;
  },
  async function (error) {
    const {
      response: { status },
    } = error;
    console.log(error, status,)
    const {dispatch} = store; // direct access to redux store.
    if (status === 401) {
      ToastMessage(ERROR,"Session Expired")
      localStorage.removeItem('Authentication_Token');
      dispatch(redirectToLogin());
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("response fails with error", error.message, error.config);
// return error;

  }
);

export default callApi;