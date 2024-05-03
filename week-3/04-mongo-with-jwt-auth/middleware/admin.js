// Middleware for handling auth

const jwt = require("jsonwebtoken");
const jwt = require("jw");

async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
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

module.exports = adminMiddleware;