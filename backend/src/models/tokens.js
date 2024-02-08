import mongoose from "mongoose";

const tokensSchema = mongoose.Schema({
    userId: { type: String, required: true },
    tokens: { type: Number, required: true },
});

export default mongoose.model("Tokens", tokensSchema);