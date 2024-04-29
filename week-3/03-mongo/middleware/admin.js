const {Admin} = require("../db/index")

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const userName= req.headers.username;
    const userPassword = req.headers.password;
    const user = await Admin.findOne({username: userName})
    if(user){
       next()
    }else{
        res.json({mssage:"Admin Does not exist"})
    }
}

module.exports = adminMiddleware;