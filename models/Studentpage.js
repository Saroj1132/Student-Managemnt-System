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

var Studentpage=mongose.model("Studentpage", pageschema)

module.exports=Studentpage