import { ADD_TOSS, SET_TOSSES, CLEAR_TOSSES } from "../constants/actionTypes";

const historyReducer = (state = { tosses: [] }, action) => {
    switch (action.type) {
        case ADD_TOSS: {
            const newTosses = [action.toss, ...state.tosses];
            if (newTosses.length > 10) newTosses.pop();
            return { ...state, tosses: newTosses };
        }

        case SET_TOSSES:
            return { ...state, tosses: action.tosses };

        case CLEAR_TOSSES:
            return { ...state, tosses: [] };

        default:
            return state;
    }
}
export default historyReducer;