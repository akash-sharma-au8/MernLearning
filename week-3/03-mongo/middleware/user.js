const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const userName= req.headers.username;
    const userPassword = req.headers.password;
    const user = await User.findOne({username: userName})
    if(user){
       next()
    }else{
        res.json({mssage:"User Does not exist"})
    }
}

module.exports = userMiddleware;