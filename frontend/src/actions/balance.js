import { SET_TOKENS } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const buyTokens = () => async (dispatch) => {
    try {
        const { data: { tokens } } = await api.buyTokens();
        dispatch({ type: SET_TOKENS, tokens });
        messages.success("Tokens were bought successfully");
    } catch (error) {
        messages.error(error.response?.data?.message || "Something went wrong");
    }
};
