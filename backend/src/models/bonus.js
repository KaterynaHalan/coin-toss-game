import mongoose from "mongoose";

const bonusSchema = mongoose.Schema({
    userId: { type: String, required: true },
    streak: { type: Number, required: true },
});

export default mongoose.model("Bonus", bonusSchema);