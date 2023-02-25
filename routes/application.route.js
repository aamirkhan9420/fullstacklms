const express = require("express")
let { UserListModel } = require("../model/userList.model")


let { ApplicationModel } = require("../model/application.model")


const applicaiontRoute = express.Router()

//-------------------------Application-------------------------------//
// --------create Application -----//

applicaiontRoute.post("/createapplication", async (req, res) => {
    let { name, email,state,course,coursetime, userId} = req.body

    //----check if student with this student id is already exist or not----//
    let isUserIdPresent = await UserListModel.findOne({ userId: userId })
    if (isUserIdPresent) {
        res.send({ "msg": ` student already persuing course` })
    } else {
        try {
            let newApplicant = new ApplicationModel({name, email,state,course,coursetime, userId })
            await newApplicant.save()
            res.send({ "msg": "Application submited successfully " })
        } catch (error) {
            res.send({ "msg": error })
        }
    }
})

// --------get Application list -----//
applicaiontRoute.get("/getapplicatonlist", async (req, res) => {

    try {
        let applicants = await ApplicationModel.find()

        res.send({ "msg": applicants })
    } catch (error) {
        res.send({ "msg": error })
    }
})

// --------Delete student -----//
applicaiontRoute.delete("/removeapplicant/:id", async (req, res) => {

    let id = req.params.id
    let userId = req.body.userId
    let applicant = await ApplicationModel.findOne({ _id: id })

    try {
        if (userId == applicant.userId) {

             await ApplicationModel.findByIdAndDelete({ _id: id })
         
            res.send({ "msg": `rejected` })
        } else {
            res.send({ "msg": "not authorized" })
        }
    } catch (error) {
        res.send({ "msg": error })
    }
})
module.exports={applicaiontRoute}