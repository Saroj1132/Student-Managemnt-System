var jwt=require("jsonwebtoken")
var reg=require('./models/StudentRegistrationSchema')

var stud=async(req, res, next)=>{
    try{
        var token=localStorage.getItem("studtoken")
        var data=jwt.verify(token, "mykey12345")
        var Reg=await reg.findOne({_id:data._id})

        req.Reg=Reg

        next()
    }catch(error){
        res.redirect("/student/Signin")
    }
}


module.exports={
    stud
}