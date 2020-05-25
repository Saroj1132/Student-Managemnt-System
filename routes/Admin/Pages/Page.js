var express=require("express")
var router=express.Router()
var auth=require("../../../auth")
var adminpage=require("../../../models/adminpage")
var studpage=require("../../../models/Studentpage")
var teachpage=require("../../../models/Teacherpage")
var registartion=require("../../../models/AdminRegistrationSchema")

router.get("/addpage",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
        
            res.render("admin/Addpages/adminpages", {records:doc})
      
    })
  
})

router.post("/adminpage", (req, res)=>{
    var Adminpage=new adminpage({
        title:req.body.title,
        slug:req.body.title,
        content:req.body.content
    })
    Adminpage.save()
    .then(docs=>{
        res.redirect("/admin/addpage")
        adminpage.find()
        .exec()
        .then(doc=>{
        req.app.locals.menu=doc
        })
    })
})
router.get("/teacherpage",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
        res.render("admin/AddPages/TeacherPage", {records:doc})
            
    })
  
})

router.post("/teacherpage", (req, res)=>{
    var Teachpage=new teachpage({
        title:req.body.title,
        slug:req.body.title,
        content:req.body.content
    })
    Teachpage.save()
    .then(docs=>{
        res.redirect("/admin/teacherpage")
        teachpage.find()
        .exec()
        .then(doc=>{
            req.app.locals.menus=doc
        })
    })
})

router.get("/studentpage",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
        res.render("admin/Addpages/StudentPage", {records:doc})
            
    })
  
})

router.post("/studpage", (req, res)=>{
    var Studpage=new studpage({
        title:req.body.title,
        slug:req.body.title,
        content:req.body.content
    })
    Studpage.save()
    .then(docs=>{
        res.redirect("/admin/studentpage")
    })
})


router.get("/adminpagelist",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
        adminpage.find()
        .exec()
        .then(docs=>{
            res.render("admin/Pagelist/adminpagelist", {records:doc, row:docs})

        })     
            
    })
  
})

router.get("/teacherpagelist",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
        teachpage.find()
        .exec()
        .then(docs=>{
            res.render("admin/Pagelist/teacherpagelist", {records:doc, row:docs})
            teachpage.find()
            .exec()
            .then(doc=>{
                req.app.locals.menus=doc
            })
        })  
            
    })
  
})

router.get("/Studentpagelist",auth.auth, (req, res)=>{
    registartion.find({_id:req.teacher._id})
    .exec()
    .then(doc=>{
        studpage.find()
        .exec()
        .then(docs=>{
            res.render("admin/Pagelist/studentpagelist", {records:doc, row:docs})

        })  
        
            
    })
  
})

router.get("/admins/delete/:id", (req, res)=>{
    adminpage.findByIdAndDelete({_id:req.params.id})
    .exec()
    .then(docs=>{
        res.redirect("/admin/adminpagelist")
        adminpage.find()
        .exec()
        .then(doc=>{
        req.app.locals.menu=doc
        })
    })
})

router.get("/teacherlist/delete/:id", (req, res)=>{
    teachpage.findByIdAndDelete({_id:req.params.id})
    .exec()
    .then(docs=>{
        res.redirect("/admin/teacherpagelist")
        teachpage.find()
        .exec()
        .then(doc=>{
            req.app.locals.menus=doc
        })
    })
})

router.get("/studentlist/delete/:id", (req, res)=>{
    studpage.findByIdAndDelete({_id:req.params.id})
    .exec()
    .then(docs=>{
        res.redirect("/admin/Studentpagelist")
    })
})
module.exports=router