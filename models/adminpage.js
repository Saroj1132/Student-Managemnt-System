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

var adminpage=mongose.model("adminpage", pageschema)

module.exports=adminpage