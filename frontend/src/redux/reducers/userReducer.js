import { CLOSE_LOADER, OPEN_LOADER } from "../actions/appActions";
import { UPDATE_USER ,UN_AUTHENTICATED } from "../actions/userActions";

const initialState = {
    isAuthenticated: false,
    userDetails: {
      created_at: null,
      email:null,
      id: null,
      is_active:  null,
      name: null,
      phone_number: null,
      role: null,
      updated_at: null,
      client_id: null
    },
    loader: false
  };
  
  export const userReducer = (state=initialState, action) => {
    switch (action.type) {
      case UPDATE_USER:
        return {
          ...state,
          isAuthenticated:true,
          userDetails:action.payload
        };
      case UN_AUTHENTICATED:
        return {
          ...state,
          ...action.payload
        };
      case OPEN_LOADER: 
        return {
          ...state,
          loader: action.payload
        }
      case CLOSE_LOADER: 
        return {
          ...state,
          loader: action.payload
        }
      default:
        return state;
    }
  };
  