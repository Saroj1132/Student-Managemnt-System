var mongoose=require("mongoose")
var Adminschema=mongoose.Schema({
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
    Registraion_Date:{
        type:Date,
        default:Date.now()
    },
    Image:{
        type:String
    }
})


var AdminRegistration=mongoose.model("AdminRegistration", Adminschema)

module.exports=AdminRegistration