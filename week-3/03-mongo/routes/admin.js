const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin} = require('../db/index')
const {Course} = require('../db/index')


// Admin Routes
router.post('/signup', async (req, res) => {
    const userName= req.headers.username;
    const userPassword = req.headers.password;
    const user = await Admin.findOne({username: userName})
    if(user){
        res.send("user already existed")
    }else{

        try{
            await Admin.create({username:userName, password: userPassword})
            res.json({mssage:"Admin creatd Successfully"})
        }
        catch(e){
            res.send("Something up")
        }
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    const courseTitle = req.body.title
    const coursePrice = req.body.price
    const courseDesc = req.body.description
    const courseImageLink = req.body.imageLink

    const course = await Course.findOne({title: courseTitle})
    if(course){
        res.json({"message":"Course with same Title Already Exist"});
    }else{
        try{
            const newCourse = await Course.create(
            {
                title:courseTitle,
                price: coursePrice,
                description: courseDesc,
                imageLink: courseImageLink
            })
            res.json({message:"Course created Successfully", courseId:newCourse._id})
        }
        catch(e){
            res.json({error:"Error in creating course"})
        }
    }
});

router.get('/courses', adminMiddleware, async(req, res) => {
    const courses = await Course.find({})
    if(courses){
        res.json({courses})
    }else{
        res.send("No Courses")
    }
});

module.exports = router;