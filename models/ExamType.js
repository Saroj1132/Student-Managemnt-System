var mongoose=require("mongoose")
var examschema=mongoose.Schema({
    Exam_Type:{
        type:String,
        require:true
    },
    Description:{
        type:String,
        require:true
    }
})


var ExamType=mongoose.model("ExamType", examschema)

module.exports=ExamType