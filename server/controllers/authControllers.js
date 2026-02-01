const authServices = require("../services/authServices");


const registerUserController = async (req,res) => {
    
    try {
        const {user,userPreferences,token,isNewUser} = await authServices.registerUser(req);
        res.status(201).json({user,userPreferences,token,isNewUser});
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}


module.exports = {
    registerUserController
}
