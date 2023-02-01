const express=require("express")
const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("welcome to home")
})
app.listen(8080,(req,res)=>{
    
    try {
        console.log(`listening on port 8080`)
    } catch (error) {
        console.log("err while connecting")
    }
})