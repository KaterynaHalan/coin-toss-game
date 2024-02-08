import { LOGIN, LOGOUT } from "../constants/actionTypes";

export const initialUser = {
    token: null,
    balance: 0
}

const loginReducer = (state = initialUser, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action?.data?.token,
                balance: action?.data?.balance
            };

        case LOGOUT:
            return { ...state, ...initialUser };

        default:
            return state;
    }
}
export default loginReducer;