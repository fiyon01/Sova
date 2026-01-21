const mongoose = require("mongoose");

const voiceReactionsSchema = new mongoose.Schema({
    voiceId: { type: String, required: true },
    userId: { type: String, required: true },
    reaction: { type: String, required: true, default: "hear_you" },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("VoiceReaction", voiceReactionsSchema);