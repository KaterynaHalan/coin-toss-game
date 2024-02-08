import { SET_TOKENS, CLEAR_TOKENS } from "../constants/actionTypes";

const balanceReducer = (state = { tokens: 0 }, action) => {
    switch (action.type) {
        case SET_TOKENS:
            return { ...state, tokens: action.tokens };

        case CLEAR_TOKENS:
            return { ...state, tokens: 0 };

        default:
            return state;
    }
}
export default balanceReducer;