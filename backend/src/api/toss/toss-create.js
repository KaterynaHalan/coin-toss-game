import Toss from "../../models/toss.js";
import flipCoin from "../../utils/flipCoin.js";
import tokensSet from "../tokens/tokens-set.js";
import tokensGet from "../tokens/tokens-get.js";
import bonusGet from "../bonus/bonus-get.js";
import bonusSet from "../bonus/bonus-set.js";

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

        let bonusStreak = await bonusGet({ userId });

        /** Randomly flip a coin and calculate the win amount */
        const coinType = flipCoin();
        let won = 0;
        if (coinType === type) {
            bonusStreak++;
            switch (bonusStreak) {
                case 3:
                    won = wager * 3;
                    break;
                case 5:
                    won = wager * 10;
                    break;
                default:
                    won = wager * 2;
            }
            if (bonusStreak >= 5) bonusStreak = 0;
        } else if (bonusStreak) {
            bonusStreak = 0;
        }

        await bonusSet({ userId, streak: bonusStreak })

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
