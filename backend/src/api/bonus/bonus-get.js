import Bonus from "../../models/bonus.js";

const bonusGet = async ({ userId }) => {
    try {
        const userBonus = await Bonus.findOne({ userId });

        return userBonus?.streak || 0;
    } catch (error) {
        return { message: "Something went wrong when tried to get bonus" };
    }
};

export default bonusGet;
