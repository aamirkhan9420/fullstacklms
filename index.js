const express=require("express")
const {connection} =require("./confige/db")
const app=express()
require("dotenv").config()
app.use(express.json())
let cors=require("cors")
const { adminRouter } = require("./routes/admin.route")
app.use(cors({
    origin:"*"
}))

let PORT=process.env.PORT

app.get("/",(req,res)=>{
    res.send("welcome to home")
})
// ------admin----//
app.use("/admin",adminRouter)
app.listen(PORT,async(req,res)=>{
    
    try {
        await connection
        console.log(`listening on port ${PORT}`)
    } catch (error) {
        console.log("err while connecting")
    }
})