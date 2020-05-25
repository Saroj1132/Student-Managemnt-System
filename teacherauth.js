var jwt=require("jsonwebtoken")
var reg=require('./models/TeacherRegistrationSchema')

var teach=async(req, res, next)=>{
    try{
        var token=localStorage.getItem("teachertoken")
        var data=jwt.verify(token, "mykey1234")
        var Reg=await reg.findOne({_id:data._id})

        req.Reg=Reg

        next()
    }catch(error){
        res.redirect("/teacher/Signin")
    }
}


module.exports={
    teach
}