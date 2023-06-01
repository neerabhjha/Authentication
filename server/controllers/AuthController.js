const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { error, success } = require("../utils/responseWrapper");
require("dotenv").config("./.env");

const signupController = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.send(error(400, "All fields are required."))
        }

        const userExist = await User.findOne({email});
        if(userExist){
            return res.send(error(409, "User Already Exist."))
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email, 
            password: hashedPassword,
        })

        
        return res.send(success(201, {user}))
    } catch (error) {
        return res.send(error(500, error.message));
    }
}

const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.send(error(400, "All fields are required."))
        }

        const checkUser = await User.findOne({email}).select("+password");
        if(!checkUser){
            return res.send(error(404, "User not found."))
        }

        const isMatched = await bcrypt.compare(password, checkUser.password);
        if(!isMatched){
            return res.send(error(403, "Invalid Password."))
        }

        const accessToken = jwt.sign({_id: checkUser._id}, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: "60s"
        });
        const refreshToken = jwt.sign({_id: checkUser._id}, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
            expiresIn:"1y"
        })
        res.cookie("jwt",refreshToken, {
            httpOnly: true,
            secure: true
        })

        return res.send(success(200, {accessToken}));

    } catch (e) {
        return res.send(error(500, e.message));
    }
}

// this api will check the refresh token and generate a new access token.
const refreshAccessTokenController = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies.jwt){
        return res.send(error(401, "Refresh token in cookies is required."))
    }

    const refreshToken = cookies.jwt;
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
        
        const accessToken = jwt.sign({_id: decoded._id}, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: "60s"
        });

        return res.send(success(201, {accessToken}));
    } catch (e) {
        return res.send(error(500, e.message));
    }
}

module.exports = {signupController, loginController, refreshAccessTokenController};