import mongoose from "mongoose";

const tossSchema = mongoose.Schema({
    userId: { type: String, required: true },
    type: { type: Number, required: true },
    wager: { type: Number, required: true },
    won: { type: Number, required: true }
});

export default mongoose.model("Toss", tossSchema);