const mongoose=require('mongoose')
const applicationschema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    state:String,
    course:String,
    coursetime:String,

})
const ApplicationModel=mongoose.model("application",applicationschema)
module.exports={ApplicationModel}
