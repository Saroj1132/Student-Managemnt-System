var mongoose=require("mongoose")
var Attnedanceschema=mongoose.Schema({
   
    Date:{
        type:Date,
        default:Date.now()
    },
    Student_id:{
        type:String,
        ref:'studentregistration'
    },
    Status:{
        type:String,
        require:true
    },
    Course_id:{
        type:String,
        ref:'Course'
    }
    
})


var Attendance=mongoose.model("Attendance", Attnedanceschema)

module.exports=Attendance