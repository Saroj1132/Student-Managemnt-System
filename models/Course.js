var mongoose=require("mongoose")
var Courseschema=mongoose.Schema({
    Courser_Name:{
        type:String,
        require:true
    },
    Description:{
        type:String,
        require:true
    }
})


var Course=mongoose.model("Course", Courseschema)

module.exports=Course