import { SET_TOSSES, SET_TOKENS, ADD_TOSS } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const createToss = (formData) => async (dispatch) => {
    try {
        const { data: { toss, tokens } } = await api.createToss(formData);
        let message = "Better luck next time.";

        dispatch({ type: ADD_TOSS, toss });
        dispatch({ type: SET_TOKENS, tokens });

        if (toss?.won > 0) {
            const bonus = toss.won / toss.wager;

            switch (bonus) {
                case 2:
                    message = `🎉 Congratulation!`;
                    break;
                case 3:
                    message = `🔥 WOW! Bonus x3!`;
                    break;
                case 10:
                    message = `🔥 WOW! Bonus x10!`;
                    break;
            }
            message += ` You won ${toss.won} tokens!`;
        }
        messages.top(message);
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
