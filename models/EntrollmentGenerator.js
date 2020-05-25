var mongoose=require("mongoose")
var schema=mongoose.Schema
var Entrollmentschema=mongoose.Schema({
    Entrollment_No:{
        type:String,
        require:true
    }
})


var Entrollment=mongoose.model("Entrollment", Entrollmentschema)

module.exports=Entrollment