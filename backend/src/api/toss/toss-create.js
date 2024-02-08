import Toss from "../../models/toss.js";
import flipCoin from "../../utils/flipCoin.js";
import tokensSet from "../tokens/tokens-set.js";
import tokensGet from "../tokens/tokens-get.js";

const tossCreate = async (req, res) => {
    try {
        const { userId, body: { type, wager } } = req;

        if (typeof type !== "number" || typeof wager !== "number") {
            return res.status(400).json({ message: "The type of provided data is incorrect" });
        }

        /** Get current tokens and check if the wager is less than balance */
        const currentTokens = await tokensGet({ userId });
        if (currentTokens < wager) {
            return res.status(400).json({ message: "Not enough tokens in your account" });
        }

        /** Randomly flip a coin, check the win and calculate the amount of win */
        const coinType = flipCoin();
        let won = 0;
        if (coinType === type) {
            won = wager * 2;
        }

        /** Save the toss to have a history of previous tosses */
        const toss = await Toss.create({
            userId,
            type,
            wager,
            won,
        });
        if (!toss) {
            return res.status(400).json({ message: "Could not create your toss" });
        }

        /** Calculate and save new tokens balance */
        const tokens = currentTokens - wager + won;

        const newTokens = await tokensSet({ userId, tokens });

        if (newTokens?.message) {
            return res.status(400).json({ message: newTokens.message });
        }

        res.status(200).json({ toss, tokens: newTokens });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong when created toss" });
    }
};

export default tossCreate;
