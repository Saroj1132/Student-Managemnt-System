var jwt=require("jsonwebtoken")
var Teacher=require('./models/AdminRegistrationSchema')

var auth=async(req, res, next)=>{
    try{
        var token=localStorage.getItem("usertoken")
        var data=jwt.verify(token, "mykey123")
        var teacher=await Teacher.findOne({_id:data._id})

        req.teacher=teacher

        next()
    }catch(error){
        res.redirect("/")
    }
}


module.exports={
    auth
}