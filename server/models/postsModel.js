const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ["Vent", "Seeking Support", "Positivity", "Other"], default: "Vent", required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post", postsSchema);