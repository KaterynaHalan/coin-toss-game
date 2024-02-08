import Tokens from "../../models/tokens.js";

const DEFAULT_TOKEN_BALANCE = 100;

const tokensSet = async ({ userId, tokens = DEFAULT_TOKEN_BALANCE }) => {
    try {
        const existingTokens = await Tokens.findOne({ userId });
        const result = existingTokens ? await Tokens.findByIdAndUpdate(
            existingTokens._id,
            { tokens },
            { new: true }
        ) : await Tokens.create({ userId, tokens });


        return result.tokens;
    } catch (error) {
        return { message: "Something went wrong when tried to set tokens" };
    }
};

export default tokensSet;
