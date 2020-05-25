var mongoose=require("mongoose")
var schema=mongoose.Schema
var examschemas=mongoose.Schema({
    Exam_TypeId:{
        type:schema.Types.ObjectId,
        ref:'ExamType'
    },
    Name:{
        type:String,
        require:true
    },
    Start_date:{
        type:Date,
        require:true
    }
})


var Exam=mongoose.model("Exam", examschemas)

module.exports=Exam