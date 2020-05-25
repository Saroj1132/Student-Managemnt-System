var express=require("express")
var router=express.Router()
var registartion=require("../../models/AdminRegistrationSchema")
var bcrypt=require("bcryptjs")
var jwt=require("jsonwebtoken")
var db=require("../../db")
var sf=require("../../models/Course")
// var path=require('path')
var Multer=require('multer')
var mkdirp=require('mkdirp')
var auth=require('../../auth')

if(typeof localStorage === "undefined" || localStorage === null){
    var LocalStorage=require("node-localstorage").LocalStorage
    localStorage = new LocalStorage('./scratch')
}

// var storage=Multer.diskStorage({
//     destination: "./public/uploads/",
//     filename: function(req, file, cb){
//         cb(null, file.originalname)
//     }
//   });
  
//   var Upload=Multer({storage:storage}).single('eimage')
  

db.on('error', (err)=>{
    console.log(err)
})

db.once('open', ()=>{
    router.get("/Signup", (req, res)=>{
        var loginuser=localStorage.getItem("usertoken")
        if(loginuser){
            res.redirect("/index")
        }else{
            res.render("admin/SignUp")
        }
        
    })

    router.post("/Signup", (req, res)=>{
        var imageFile = typeof req.files.eimage !== "undefined" ? req.files.eimage.name : "";

        
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
                    Mobile_No:req.body.Mobile_No,
                    Image:imageFile
                })
                Registartion.save(function(err){
                    if(err){
                        return console.log(err)
                    }
                    mkdirp('public/userimage/', function (err) {
                        return console.log(err);
                    });
                    if (imageFile != "") {
                        var productImage = req.files.eimage;
                        var path = 'public/userimage/' + imageFile;
    
                        productImage.mv(path, function (err) {
                            return console.log(err);
                        });
                    }    
                    req.flash("success-message", "Registration Succesfully!!")
                    res.redirect("/")
                })
                
            }
        })
    })
    router.get("/", (req, res)=>{
        var loginuser=localStorage.getItem("usertoken")
        if(loginuser){
            res.redirect("/index")
        }else{
            res.render("admin/Signin")
        }
        
    })

    router.post("/Signin", (req, res)=>{
        
        registartion.find({Email:req.body.Email})
        .exec()
        .then(doc=>{
            if(bcrypt.compareSync(req.body.Password, doc[0].Password)){
                var token=jwt.sign({
                    _id:doc[0]._id
                }, "mykey123")
                localStorage.setItem("usertoken", token)
                localStorage.setItem("logtoken", token)
                
                    res.redirect("/index")
                
                    
            }else{
                res.render("admin/Signin")
            }
        })
    })
    router.get("/logout", (req, res)=>{
        var loginuser=localStorage.removeItem("usertoken")
        if(loginuser){
            res.redirect("/")
        }else{
            res.redirect("/index")
        }
        
    })
    router.get("/index",auth.auth, (req, res)=>{
        registartion.find({_id:req.teacher._id})
        .exec()
        .then(doc=>{
            res.render("index", {records:doc})
            
        })
        
    })
    
    router.get("/head",auth.auth, (req, res)=>{
        registartion.find({_id:req.teacher._id})
        .exec()
        .then(doc=>{
            res.render("paritals/header", {records:doc})
            
        })
        
    })

    
    
    
})
module.exports=router