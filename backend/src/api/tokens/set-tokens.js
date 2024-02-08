import Tokens from "../../models/tokens.js";

const DEFAULT_TOKEN_BALANCE = 100;

const setTokens = async (req, res) => {
    try {
        const { token, userId, balance } = req;

        const result = await Tokens.create({
            userId,
            balance: balance || DEFAULT_TOKEN_BALANCE,
        });

        if (!result) {
            return res.status(400).json({ message: "Could not set tokens" });
        }

        res.status(200).json({ token, balance: result?.balance || 0 });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export default setTokens;
