var mongoose=require("mongoose")
var url="mongodb://localhost:27017/SMS"

mongoose.connect(url, {useUnifiedTopology:true, useNewUrlParser:true})

var db=mongoose.connection

module.exports=db
