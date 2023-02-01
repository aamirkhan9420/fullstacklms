const mongoose=require('mongoose')
const adminschema=mongoose.Schema({
    email:String,
    password:String
})
const AdminModel=mongoose.model("admin",adminschema)
module.exports={AdminModel}