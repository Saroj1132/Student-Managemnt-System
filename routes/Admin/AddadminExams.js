var express=require("express")
var router=express.Router()
var auth=require("../../auth")

var registartion=require("../../models/AdminRegistrationSchema")



router.post("/Addcourse", (req, res)=>{
    var Course=new course({
        Courser_Name:req.body.Courser_Name,
        Description:req.body.Description
    })
    Course.save()
    .then(docs=>{
        res.redirect("/Course/Course")
        
    })
})



router.get("/courselist",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
        course.find()
        .exec()
        .then(docs=>{
            res.render("admin/coureslist", {records:doc, row:docs})
        })
    })
  
    
    router.get("/courselist",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
        course.find()
        .exec()
        .then(docs=>{
            res.render("admin/coureslist", {records:doc, row:docs})
        })
    })
  
})

router.get("/delete/:id", (req, res)=>{
    course.findByIdAndDelete({_id:req.params.id})
    .exec()
    .then(docs=>{
        res.redirect("/Course/courselist")
    })
    })
  
})


module.exports=router