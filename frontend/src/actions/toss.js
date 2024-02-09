import { SET_TOSSES, SET_TOKENS, ADD_TOSS } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

const WIN_TYPE = Object.freeze({
    default: 2,
    bonusX3: 3,
    bonusX10: 10
});

export const createToss = (formData) => async (dispatch) => {
    try {
        const { data: { toss, tokens } } = await api.createToss(formData);
        let message = "Better luck next time.";

        dispatch({ type: ADD_TOSS, toss });
        dispatch({ type: SET_TOKENS, tokens });

        /** Display a pop-up message to a user with amount of won tokens */
        if (toss?.won > 0) {
            /** Calculate to define is it bonus and what type */
            const bonus = toss.won / toss.wager;

            switch (bonus) {
                case WIN_TYPE.default:
                    message = `🎉 Congratulation!`;
                    break;
                case WIN_TYPE.bonusX3:
                    message = `🔥 WOW! Bonus x3!`;
                    break;
                case WIN_TYPE.bonusX10:
                    message = `🔥 WOW! Bonus x10!`;
                    break;
            }
            message += ` You won ${toss.won} tokens!`;
        }
        messages.top(message);
    } catch (error) {
        messages.error(error.response?.data?.message || "Something went wrong");
    }
};

export const getTosses = () => async (dispatch) => {
    try {
        const { data: { tosses } } = await api.getTosses();
        dispatch({ type: SET_TOSSES, tosses });
    } catch (error) {
        messages.error(error.response?.data?.message || "Something went wrong");
    }
};
