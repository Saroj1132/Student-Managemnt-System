var mongoose=require("mongoose")
var Classroomsch=mongoose.Schema({
    Year:{
        type:String,
        require:true
    },
    Course_id:{
        type:String,
        ref:'Course'
    },
    Standerd:{
        type:String,
        require:true
    },
    Section:{
        type:String,
        require:true
    },
    remarks:{
        type:String,
        require:true
    },
    Teacher_id:{
        type:String,
        ref:'teacherregistration'
    },
})


var Classroom=mongoose.model("Classroom", Classroomsch)

module.exports=Classroom