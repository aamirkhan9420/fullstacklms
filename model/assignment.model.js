const mongoose=require('mongoose')
const assignmentschema=mongoose.Schema({

    topic_name:String,
    date:String,
    time:String,
    teacher_name:String,
    topic_id:String,
    type:String,
    userId:String

})
const AssignmentsModel=mongoose.model("assignment",assignmentschema)
module.exports={AssignmentsModel}
