var express=require("express")
var router=express.Router()
var stduregistartion=require("../../models/StudentRegistrationSchema")

var registartion=require("../../models/TeacherRegistrationSchema")
var db=require("../../db")
var bcrypt=require("bcryptjs")
var jwt=require("jsonwebtoken")
var classroom_student=require("../../models/Classroom_student")
var classroom=require('../../models/Classroom')
var attendance=require('../../models/Attendance')
var exam=require("../../models/Exam")
var examresult=require("../../models/ExamResult")
var teacherauth=require('../../teacherauth')


db.on('error', (err)=>{
    console.log(err)
})

db.once('open', ()=>{
    router.get("/index", (req, res)=>{
        res.render("Teacher/index")
        
    })
    router.get("/attendance", teacherauth.teach, (req, res)=>{
        classroom_student.find()
        .populate("Student_id")
        .then(doc=>{
            classroom.find({Teacher_id:req.Reg._id})
            .populate("Course_id")
            .then(docs=>{
                console.log(docs)
                res.render("Teacher/Attendance", {Student:doc, Subject:docs})
            })
        })
        
    })
    
    router.post("/attendance", (req, res)=>{
        var att=new attendance({
            Student_id:req.body.Student_id,
            Status:req.body.Status,
            Course_id:req.body.Course_id
        })
        att.save()
        .then(doc=>{
            res.redirect("/teacher/attendance")
        })
    })  

    router.get("/TeacherInfo", teacherauth.teach, (req, res)=>{
        classroom.find({Teacher_id:req.Reg._id})
        .populate("Course_id")
        .then(doc=>{
            res.render("Teacher/classroominfo", {row:doc})

        })
    })

    router.get("/Exam_Result",teacherauth.teach, (req, res)=>{
        exam.find()
        .exec()
        .then(doc=>{
            classroom_student.find()
            .populate("Student_id")
            .then(docs=>{
                classroom.find({Teacher_id:req.Reg._id})
                .populate("Course_id")
                .then(docss=>{
                    res.render("Teacher/ExamResult", {exam:doc, Student:docs, Subject:docss})

                })
            })
        })
    })

    router.post("/Exam_Result", (req, res)=>{
        var examr=new examresult({
            Exam_Id:req.body.Exam_Id,
            Student_id:req.body.Student_id,
            Course_id:req.body.Course_id,
            Marks:req.body.Marks

        })
        examr.save()
        .then(doc=>{
            res.redirect("/teacher/Exam_Result")
        })
    })  
    
    router.get("/Result_Info", (req, res)=>{
        examresult.find()
        .populate("Exam_Id")
        .populate("Student_id")
        .populate("Course_id")
        .then(doc=>{
            res.render("teacher/Resultinfo", {row:doc})
        })
    })  

    router.get("/Signin", (req, res)=>{
        var loginuser=localStorage.getItem("teachertoken")
        if(loginuser){
            res.redirect("/teacher/index")
        }else{
            res.render("Teacher/TeacherSignin")
        }
    })

    router.post("/Signin", (req, res)=>{
        
        registartion.find({Email:req.body.Email})
        .exec()
        .then(doc=>{
            if(bcrypt.compareSync(req.body.Password, doc[0].Password)){
                var token=jwt.sign({
                    _id:doc[0]._id
                }, "mykey1234")
                localStorage.setItem("teachertoken", token)
                res.redirect("/teacher/index")
                
                    
            }else{
                res.render("Teacher/TeacherSignin")
            }
        })
    })

    router.get("/Signup", (req, res)=>{
        var loginuser=localStorage.getItem("teachertoken")
        if(loginuser){
            res.redirect("/teacher/index")
        }else{
            res.render("Teacher/TeacherSignup")
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
                        res.redirect("/teacher/Signin")
                
                    })        
                    
                
            }
        })
    })

    router.get("/logout", (req, res)=>{
        var loginuser=localStorage.removeItem("teachertoken")
        if(loginuser){
            res.redirect("/teacher/index")
        
        }else{
            res.redirect("/teacher/Signin")    
        }
        
    })
    
    
})
module.exports=router