const mongoose=require('mongoose')
const lectureschema=mongoose.Schema({
    
  topic_name:String,
    date:String,
    time:String,
    teacher_name:String,
    topic_id:String,
    type:String,
    userId:String

})
const LectureModel=mongoose.model("lecture",lectureschema)
module.exports={LectureModel}
