
import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { userReducer } from "./userReducer";
import { dashboardReducer } from "./dashboardReducer";
import { connectRouter } from 'connected-react-router';

export const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    app: appReducer,
    user: userReducer,
    dashboard: dashboardReducer
})
