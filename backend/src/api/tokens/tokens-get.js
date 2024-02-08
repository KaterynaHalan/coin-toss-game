import Tokens from "../../models/tokens.js";

const tokensGet = async ({ userId }) => {
    try {
        const userTokens = await Tokens.findOne({ userId });

        return userTokens?.tokens || 0;
    } catch (error) {
        return { message: "Something went wrong when tried to get tokens" };
    }
};

export default tokensGet;
