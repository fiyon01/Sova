const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const UserPreferences = require("../models/userPreferences");





const registerUser = async (req) => {
    const { email, password, username, avatar, selectedOption, selectedOption2 } = req.body;

    try {
        // 1. Check if user already exists
        const isHasUser = await User.findOne({ email });
        if (isHasUser) {
            return { error: "User already exists" };
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create User
        // Declare 'user' in the main try block so it's accessible later
        const user = await User.create({ 
            username, 
            email, 
            password: hashedPassword, 
            avatar 
        });

        // 4. Create User Preferences
        const userPreferences = await UserPreferences.create({ 
            userId: user._id, 
            selectedOption, 
            selectedOption2 
        });

        // 5. Generate Token
        const token = jwt.sign(
            { userid: user._id, username: user.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: "2h" }
        );

        // Return everything on success
        return { user, userPreferences, token,isNewUser:true };

    } catch (error) {
        console.error("Registration Error:", error);
        // Distinguish between custom errors and server crashes
        return { error: error.message || "An unexpected error occurred during registration" };
    }
};


module.exports = {
    registerUser
};
