import tokensSet from "./tokens-set.js";

const tokensBuy = async (req, res) => {
    try {
        const { userId } = req;

        const tokens = await tokensSet({ userId });

        if (tokens?.message) {
            return res.status(400).json({ message: tokens.message });
        }

        res.status(200).json({ tokens });
    } catch (error) {
        return { message: "Something went wrong when tried to buy tokens" };
    }
};

export default tokensBuy;
