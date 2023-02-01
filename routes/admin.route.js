const express=require("express")
let {AdminModel}=require("../model/admin.model")
let jwt=require("jsonwebtoken")
let bcrypt=require("bcrypt")
const adminRouter=express.Router()
adminRouter.get("/",(req,res)=>{
    res.send("welcome to admin pannel")
})
adminRouter.post("/signup",async(req,res)=>{
   let {email,password}=req.body
   try {
      bcrypt.hash(password,5,async(err,hashpasword)=>{
         if(hashpasword){
          let newadmin=new AdminModel({email:email,password:hashpasword})
      await newadmin.save()
      res.send({"msg":"new admin added"})
      }else{
         res.send({"msg":"failed to add new admin"}) 
      } 
      })
     
   
   } catch (error) {
    console.log(error)
    res.send({"msg":error})
   }
   
})
adminRouter.post("/login",async(req,res)=>{
   let {email,password}=req.body
   let user=await AdminModel.find({email})

try {
  if(user.length>0){
   let hashpassword=user[0].password
   
     bcrypt.compare(password,hashpassword,(err,result)=>{
      console.log("ehhel")
       if(result){
           jwt.sign({userId:user[0]._id},process.env.KEY,(er,token)=>{
               if(token){
                   res.send({"msg":"login successful","token":token})
               }else{
                   res.send({"msg":"login failed","err":er})
               }
           })
       }else{
           res.send({"msg":"login failed","err":err})
       }
     })
  }
  
} catch (error) {
  res.send({msg:error})
  
}
 

})
module.exports={adminRouter}