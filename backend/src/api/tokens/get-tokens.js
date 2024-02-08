import Tokens from "../../models/tokens.js";

const getTokens = async (req, res) => {
    try {
        const { token, userId } = req;

        const userTokens = await Tokens.findOne({ userId });

        res.status(200).json({ token, balance: userTokens?.balance || 0 });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export default getTokens;
