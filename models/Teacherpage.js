var mongose=require("mongoose")

var pageschema=mongose.Schema({
    title:{
        type:String,
        require:true
    },
    slug:{
        type:String   
    },
    content:{
        type:String,
        require:true
    }
    
    
})

var Teacherpage=mongose.model("Teacherpage", pageschema)

module.exports=Teacherpage