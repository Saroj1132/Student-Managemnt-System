var mongoose=require("mongoose")
var schema=mongoose.Schema
var Classstud=mongoose.Schema({
   
    Student_id:{
        type:schema.Types.ObjectId,
        ref:'studentregistration'
    },
    Section:{
        type:String,
        require:true
    },
    Standerd:{
        type:String,
        require:true
    }
    
})


var Classroom_student=mongoose.model("classroom_student", Classstud)

module.exports=Classroom_student