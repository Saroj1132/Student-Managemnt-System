var express=require("express")
var router=express.Router()
var auth=require("../../auth")

var course=require("../../models/Course")
var studregistartion=require("../../models/StudentRegistrationSchema")
var registartion=require("../../models/AdminRegistrationSchema")
var teacherregistartion=require("../../models/TeacherRegistrationSchema")
var ExamType=require("../../models/ExamType")
var Exam=require("../../models/Exam")
var classroom=require("../../models/Classroom")
var classroomstud=require("../../models/Classroom_student")
var entrollment=require('../../models/EntrollmentGenerator')

router.get("/Course",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
        
            res.render("admin/AddCoursePage", {records:doc})
      
    })
  
})

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
  
    


router.get("/delete/:id", (req, res)=>{
    course.findByIdAndDelete({_id:req.params.id})
    .exec()
    .then(docs=>{
        res.redirect("/Course/courselist")
    })
    })
  
})

router.get("/Exam_Type",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
        
            res.render("admin/AddExamType", {records:doc})
      
    })
  
})
router.post("/AddExamType", (req, res)=>{
    var examType=new ExamType({
        Exam_Type:req.body.Exam_Type,
        Description:req.body.Description
    })
    examType.save()
    .then(docs=>{
        res.redirect("/Course/Exam_Type")
        
    })
})
router.get("/ExamTypeList",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
            ExamType.find()
            .then(docs=>{
                res.render("admin/ExamTypeList", {records:doc, row:docs})
      
            })
            
    })
  
})
router.get("/examType/delete/:id", (req, res)=>{
    ExamType.findByIdAndDelete({_id:req.params.id})
    .exec()
    .then(docs=>{
        res.redirect("/Course/ExamTypeList")
    })

})

// router.get("/examType/edit/:id",auth.auth (req, res)=>{
//     registartion.find({_id:req.teacher._id})
//     .exec()
//     .then(doc=>{
//         ExamType.findOne({_id:req.params.id})
//         .exec()
//         .then(docs=>{
//             res.render("admin/EditAddExamType" , {records:doc, com:docs})
//         })        
//     })
    

// })



  
router.get("/Exam",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
            ExamType.find()
            .exec()
            .then(docs=>{
                res.render("admin/AddExam", {records:doc, exam:docs})
            })
            
      
    })
  
})
router.post("/AddExam", (req, res)=>{
    var exam=new Exam({
        Exam_TypeId:req.body.Exam_TypeId,
        Name:req.body.Name,
        Start_date:req.body.Date
    })
    exam.save()
    .then(docs=>{
        res.redirect("/Course/Exam")
        
    })
})
router.get("/ExamList",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
            Exam.find()
            .populate("Exam_TypeId")
            .then(docs=>{
                res.render("admin/Examlist", {records:doc, row:docs})
      
            })
            
    })
  
})
router.get("/deleteExam/:id", (req, res)=>{
    Exam.findByIdAndDelete({_id:req.params.id})
    .exec()
    .then(docs=>{
        res.redirect("/Course/ExamList")
    })

})

router.get("/Classroom",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
            course.find()
            .exec()
            .then(docss=>{
                teacherregistartion.find()
                .exec()
                .then(docs=>{
                    res.render("admin/AddClassRoom", {records:doc, course:docss, Teacher:docs})
                
                })
            })
            
      
    })
  
})
router.post("/Classroom", (req, res)=>{
    var Classroom=new classroom({
        Year:req.body.Year,
        Course_id:req.body.Course_id,
        Standerd:req.body.Standerd,
        Section:req.body.Section,
        remarks:req.body.remarks,
        Teacher_id:req.body.Teacher_id
    })
    Classroom.save()
    .then(docs=>{
        res.redirect("/Course/Classroom")
        
    })
})
router.get("/classroomlist",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
            classroom.find()
            .populate("Course_id")
            .populate("Teacher_id")
            .then(docs=>{
                res.render("admin/classroomlist", {records:doc, row:docs})
      
            })
            
    })
  
})
router.get("/deleteclass/:id", (req, res)=>{
    classroom.findByIdAndDelete({_id:req.params.id})
    .exec()
    .then(docs=>{
        res.redirect("/Course/classroomlist")
    })

})

router.get("/Classroom_Student",auth.auth,  (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
            course.find()
            .exec()
            .then(docs=>
                studregistartion.find()
                .exec()
                .then(studs=>{
                    classroom.find()
                    .exec()
                    .then(stan=>{
                        res.render("admin/AddStudentClassroom", {records:doc, course:docs, Student:studs, Stan:stan})

                    })
                })

            )
            
      
    })
  
})
router.post("/Classroomstud", (req, res)=>{
    var Classroomstud=new classroomstud({
        Student_id:req.body.Student_id,        
        Standerd:req.body.Standerd,
        Section:req.body.Section
    })
    Classroomstud.save()
    .then(docs=>{
        res.redirect("/Course/Classroom_Student")
        
    })
})
router.get("/classroomstudent_list",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
        classroomstud.find()
            .populate("Student_id")
            
            .then(docs=>{
                res.render("admin/classroomstudlist", {records:doc, row:docs})
      
            })
            
    })
  
})
router.get("/deleteclasstud/:id", (req, res)=>{
    classroomstud.findByIdAndDelete({_id:req.params.id})
    .exec()
    .then(docs=>{
        res.redirect("/Course/classroomstudent_list")
    })

})


router.get("/Student_Information",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
        var Mongoclient=require("mongodb").MongoClient
        var url="mongodb://localhost:27017/SMS"

        Mongoclient.connect(url, (err, db)=>{
            var dbo=db.db("SMS")
            dbo.collection("studentregistrations").aggregate([
                {
                    $lookup: {
                        from:"classroom_students",
                        localField:"_id",
                        foreignField:"Student_id",
                        as:"classdetails"
                    }
                },
                
                {
                    $lookup: {
                        from:"entrollments",
                        localField:"Entrollment_Id",
                        foreignField:"_id",
                        as:"entrolldetails"
                    }
                },
                {
                    $project:{
                        Email:1,
                        Fname:1,
                        Lname:1,
                        Mobile_No:1,
                        DOB:1,
                        Section:"$classdetails.Section",
                        Standerd:"$classdetails.Standerd",
                        Entrollment_No:"$entrolldetails.Entrollment_No"
                    }
                }
            ]).toArray(function(err, ress){
                console.log(ress)
                res.render("admin/Student_information", {records:doc, row:ress})
            })
    })
})
    
})

router.get("/Generate_Entrollment/:id",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
        studregistartion.findById({_id:req.params.id})
        .exec()
        .then(docs=>{
            res.render("admin/AddgenerateEnrollmemt", {records:doc, com:docs})

        })
    })
    
})

router.post("/Generate_Entrollment/:id", (req, res)=>{
    studregistartion.findById(req.body.id)
    .then(post=>{
        var Entrollment=new entrollment({
            Entrollment_No:req.body.Entrollment
        })
        post.Entrollment_Id.push(Entrollment)
        post.save()
        .then(data=>{
            Entrollment.save()
            .then(all=>{
                res.redirect("/Course/Enrollment_Generator")
            })
            
        })
    })

    
})


router.get("/Teacher_Information",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
        var Mongoclient=require("mongodb").MongoClient
        var url="mongodb://localhost:27017/SMS"

        Mongoclient.connect(url, (err, db)=>{
            var dbo=db.db("SMS")
            dbo.collection("teacherregistrations").aggregate([
                {
                    $lookup: {
                        from:"classrooms",
                        localField:"_id",
                        foreignField:"Teacher_id",
                        as:"classdetails"
                    }
                },
                {
                    $project:{
                        Email:1,
                        Fname:1,
                        Lname:1,
                        Mobile_No:1,
                        DOB:1,
                        Section:"$classdetails.Section",
                        Standerd:"$classdetails.Standerd",
                        Year:"$classdetails.Year"                    }
                }
            ]).toArray(function(err, ress){
                console.log(ress)
                res.render("admin/Teacher_information", {records:doc, row:ress})
            })
    })
})
    
})


module.exports=router