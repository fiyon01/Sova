const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();
const authRoutes = require("./routes/authRoutes");
connectDB();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ["http://localhost:5173", "http://192.168.100.2:5173"],
        methods: ["GET", "POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }
});

app.use(cors());
app.use(express.json())



io.on("connection", (socket) => {
    console.log("A user connected with id: ", socket.id);
    socket.on("disconnect", () => {
        console.log("User disconnected with id: ", socket.id);
    });
});

app.use("/api",authRoutes);

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
