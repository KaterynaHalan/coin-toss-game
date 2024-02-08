import { combineReducers } from "redux";
import login from "./login";
import balance from "./balance";
import history from "./history";

export default combineReducers({
    user: login,
    balance,
    history
});
