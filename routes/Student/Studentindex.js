var express=require("express")
var router=express.Router()
var registartion=require("../../models/StudentRegistrationSchema")
var db=require("../../db")
var bcrypt=require("bcryptjs")
var jwt=require("jsonwebtoken")
var Classroom_student=require('../../models/Classroom_student')
var attendance=require('../../models/Attendance')
var exam=require("../../models/Exam")
var examresult=require("../../models/ExamResult")
var studauth=require('../../studentauth')


db.on('error', (err)=>{
    console.log(err)
})

db.once('open', ()=>{
    router.get("/index" , (req, res)=>{
        res.render("Student/index")
    })

    router.get("/StudentInfo", studauth.stud, (req, res)=>{
    Classroom_student.find({Student_id:req.Reg._id})
    .populate("Student_id")
    .then(doc=>{
        res.render("Student/Studentinfo", {row:doc})
        })
    })

    router.get("/AttendanceInfo", studauth.stud, (req, res)=>{
        attendance.find({Student_id:req.Reg._id})
        .populate("Student_id")
        .populate("Course_id")
        .then(doc=>{
            res.render("Student/AttendanceInfo", {row:doc})
            })
        })

    router.get("/StudentResult", studauth.stud, (req, res)=>{
    examresult.find({Student_id:req.Reg._id})
        .populate("Exam_Id")
        .populate("Student_id")
        .populate("Course_id")
        .then(doc=>{
            res.render("Student/Resultinfo", {row:doc})
        })
    })

    router.get("/Signin", (req, res)=>{
        var loginuser=localStorage.getItem("studtoken")
        if(loginuser){
            res.redirect("/student/index")
        }else{
            res.render("Student/StudentSignin")
        }
    })

    router.post("/Signin", (req, res)=>{
        
        registartion.find({Email:req.body.Email})
        .exec()
        .then(doc=>{
            if(bcrypt.compareSync(req.body.Password, doc[0].Password)){
                var token=jwt.sign({
                    _id:doc[0]._id
                }, "mykey12345")
                localStorage.setItem("studtoken", token)
                res.redirect("/student/index")
                
                    
            }else{
                res.render("Student/StudentSignin")
            }
        })
    })

    router.get("/Signup", (req, res)=>{
        var loginuser=localStorage.getItem("studtoken")
        if(loginuser){
            res.redirect("/student/index")
        }else{
            res.render("Student/StudentSignup")
        }
    })

    router.post("/Signup", (req, res)=>{
        
        bcrypt.hash(req.body.Password, 10, (err, hash)=>{
            if(err){
                req.flash("error_message", "Somthing what wrong !!")
            }else{
                var Registartion=new registartion({
                    Fname:req.body.Fname,
                    Lname:req.body.Lname,
                    Email:req.body.Email,
                    Password:hash,
                    DOB:req.body.DOB,
                    Mobile_No:req.body.Mobile_No
                })
                Registartion.save()
                    .then(doc=>{
                        req.flash("success-message", "Registration Succesfully!!")
                        res.redirect("/student/Signin")
                
                    })        
                    
                
            }
        })
    })

    router.get("/logout", (req, res)=>{
        var loginuser=localStorage.removeItem("studtoken")
        if(loginuser){
            res.redirect("/student/index")
        
        }else{
            res.redirect("/student/Signin")    
        }
        
    })
    
    
})
module.exports=router