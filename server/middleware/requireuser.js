const { error } = require("../utils/responseWrapper");
const jwt = require('jsonwebtoken');
require('dotenv').config('./.env');

module.exports = async (req, res, next) => {
    if (!req.headers?.authorization?.startsWith("Bearer")) {
        return res.send(error(401, "Authorization header is required."))
    }

    const accessToken = req.headers.authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        req._id = decoded._id;
        next();
    } catch (e) {
        
        return res.send(error(401, e.message))
    }
    next();
}