import Toss from "../../models/toss.js";

const tossHistory = async (req, res) => {
    try {
        const { userId } = req;
        const tosses = await Toss.find({ userId }).sort({ createdAt: -1 }).limit(10);

        res.status(200).json({ tosses });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong when tried to get history" });
    }
};

export default tossHistory;
