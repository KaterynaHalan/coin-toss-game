import Bonus from "../../models/bonus.js";

const bonusSet = async ({ userId, streak = 0 }) => {
    try {
        const existingBonus = await Bonus.findOne({ userId });
        const result = existingBonus ? await Bonus.findByIdAndUpdate(
            existingBonus._id,
            { streak },
            { new: true }
        ) : await Bonus.create({ userId, streak });

        return result.streak;
    } catch (error) {
        return { message: "Something went wrong when tried to set bonus" };
    }
};

export default bonusSet;
