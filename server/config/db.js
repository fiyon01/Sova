const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Options can be added here if needed for specific timeout/buffer behaviors
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        // Exit with failure
        process.exit(1);
    }
};

// Monitor connection events
mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected! Attempting to reconnect...");
});

mongoose.connection.on("error", (err) => {
    console.error(`MongoDB error: ${err}`);
});

// Handle graceful shutdown (Ctrl+C or Kill process)
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
});

module.exports = connectDB;