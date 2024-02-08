import mongoose from "mongoose";

const tossesSchema = mongoose.Schema({
    userId: { type: String, required: true },
    type: { type: Number, required: true },
    bet: { type: Number, required: true },
    won: { type: Number, required: true }
});

export default mongoose.model("Tosses", tossesSchema);