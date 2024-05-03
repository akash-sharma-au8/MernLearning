const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
// User Routes
router.post('/signup', async (req, res) => {
    const userName= req.headers.username;
    const userPassword = req.headers.password;
    const user = await User.findOne({username: userName})
    if (user) {
        res.json({ mssage: "User already exist" })
    } else {
        try{
            await User.create({
                username: userName,
                password: userPassword
            })
            res.json({ mssage: "User created successfully" })
        }catch(e){
            res.json({mssage:"Error in creating user"})
        }
    }
});

router.post('/signin', async (req, res) => {
    const userName= req.headers.username;
    const userPassword = req.headers.password;
    const user = await User.findOne({username: userName})
    if(!user){
        res.send("User doesn't exist, Please Sign Up")
    }else{
        try{
            const token = await jwt.sign({userName, userPassword}, jwtPrivateKey)
            await User.create({username:userName, password: userPassword})
            res.json({mssage:"User created Successfully", accessToken: token})
        }
        catch(e){
            res.send("Something up")
        }
    }

});

router.get('/courses',userMiddleware, async (req, res) => {
    try{
        const courses = await Course.find({});
        res.json({courses})
    }catch(e){
        res.json({"message":"Error in getting Course"})
    }

});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const courseId = req.params.courseId;
    const user = await User.findOne({ username: req.headers.username });
    if(user.purchasedCourse.includes(courseId)){
        res.json({"message":"You have already purchased this course"})
    }else{
        try{
            await User.updateOne({username:req.headers.username},{"$push": {
                purchasedCourse: courseId
            }})
            res.json({"message":"Purchased Successfull"})
        }catch(e){
            res.json({"error":"Error in purchasing Course"})
        }
    }
    
   
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const username =  req.headers.username
    const user =  await User.findOne({username:username})
    if(!user){
        res.json({"msg":"User doesnt exist"})
        return
    }

    const courses = user.purchasedCourse;
    const purchasedCourses = await Course.find({_id: {$in: courses}})
    res.json({"Your courses": purchasedCourses})

});

module.exports = router