import { LOGIN, LOGOUT } from "../constants/actionTypes";

const loginReducer = (state = { token: null }, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, token: action.token };

        case LOGOUT:
            return { ...state, token: null };

        default:
            return state;
    }
}
export default loginReducer;