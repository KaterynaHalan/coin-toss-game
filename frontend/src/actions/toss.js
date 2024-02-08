import { SET_TOSSES, SET_TOKENS, ADD_TOSS } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const createToss = (formData) => async (dispatch) => {
    try {
        const { data: { toss, tokens } } = await api.createToss(formData);
        dispatch({ type: ADD_TOSS, toss });
        dispatch({ type: SET_TOKENS, tokens });

        if (toss?.won > 0) {
            messages.success(`Congratulation! You won ${toss.won} tokens`);
        } else {
            messages.info("Better luck next time");
        }
    } catch (error) {
        messages.error(error.response.data.message);
    }
};

export const getTosses = () => async (dispatch) => {
    try {
        const { data: { tosses } } = await api.getTosses();
        dispatch({ type: SET_TOSSES, tosses });
    } catch (error) {
        messages.error(error.response.data.message);
    }
};
