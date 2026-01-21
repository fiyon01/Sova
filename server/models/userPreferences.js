const mongoose = require("mongoose");

const userPreferencesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    shareType: {
        type: String,
        enum: ["public", "anonymous", "private", "friends"],
        default: "anonymous"
    },
    likesEnabled: {
        type: Boolean,
        default: false
    },
    responseType: {
        type: String,
        enum: ["support only","allow responses", "no responses"],
        default: "support only"
    },
    
    
})

module.exports = mongoose.model("UserPreferences", userPreferencesSchema);
