const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    console.log(token)
    try{
        await jwt.verify(token, jwtPrivateKey);
        next()
    }
    catch(e){
        res.json({"msg": "Not Authorized"})
    }
}

module.exports = userMiddleware;