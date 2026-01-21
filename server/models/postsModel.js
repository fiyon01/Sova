const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    post_type: { type: String, enum: ["private", "share", "sit"], default: "private", required: true },
    content: { type: String, required: true },
    tags: { type: String, enum: ["Vent", "Seeking Support", "Positivity", "Other"], default: "Vent", required: false },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post", postsSchema);