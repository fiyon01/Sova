const {registerUserController} = require("../controllers/authControllers");

const express = require("express");
const router = express.Router();


router.post("/auth/signup",registerUserController);

module.exports = router;