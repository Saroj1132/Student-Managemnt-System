var mongoose=require("mongoose")
var schema=mongoose.Schema
var exammarksschemas=mongoose.Schema({
    Exam_Id:{
        type:schema.Types.ObjectId,
        ref:'Exam'
    },
    Student_id:{
        type:schema.Types.ObjectId,
        ref:'studentregistration'
    },
    Course_id:{
        type:schema.Types.ObjectId,
        ref:'Course'
    },
    Marks:{
        type:String,
        require:true
    }
})


var ExamResult=mongoose.model("ExamResult", exammarksschemas)

module.exports=ExamResult