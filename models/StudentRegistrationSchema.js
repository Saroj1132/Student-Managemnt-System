var mongoose=require("mongoose")
var schema=mongoose.Schema
var Studentschema=mongoose.Schema({
    Email:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    },
    Fname:{
        type:String,
        require:true
    },
    Lname:{
        type:String,
        require:true
    },
    DOB:{
        type:Date,
        require:true
    },
    Mobile_No:{
        type:String,
        require:true
    },
    Entrollment_Id:[
        {
            type:schema.Types.ObjectId,
            ref:'Entrollment'
        }
    ],
    Registraion_Date:{
        type:Date,
        default:Date.now()
    }
    // Image:{
    //     type:String
    // }
})


var StudentRegistration=mongoose.model("studentregistration", Studentschema)

module.exports=StudentRegistration