import {SET_TOKENS, TOSS} from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const createToss = (formData) => async (dispatch) => {
    try {
        const { data: { result, tokens } } = await api.createToss(formData);
        dispatch({ type: TOSS, result });
        dispatch({ type: SET_TOKENS, tokens });

        if (result?.won > 0) {
            messages.success(`Congratulation! You won ${result.won} tokens`);
        } else {
            messages.info("Better luck next time");
        }
    } catch (error) {
        messages.error(error.response.data.message);
    }
};
