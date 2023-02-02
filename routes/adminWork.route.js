const express = require("express")
let { UserListModel } = require("../model/userList.model")
let { BlockListModel } = require("../model/blockstudent.model")
let jwt = require("jsonwebtoken")
let bcrypt = require("bcrypt")
const adminWork = express.Router()

// --------create student -----//

adminWork.post("/createStudent", async (req, res) => {
    let { name, email, student_id, image } = req.body

    //----check if student with this student id is already exist or not----//
    let isUserIdPresent = await UserListModel.findOne({ student_id: student_id })
    if (isUserIdPresent) {
        res.send({ "msg": ` student with student id ${student_id} already exist` })
    } else {
        try {
            let newUser = new UserListModel({ name, email, student_id, image })
            await newUser.save()
            res.send({ "msg": "new student added" })
        } catch (error) {
            res.send({ "msg": error })
        }
    }
})

// --------get students list -----//
adminWork.get("/getStudentsList", async (req, res) => {

    try {
        let students = await UserListModel.find()

        res.send({ "msg": students })
    } catch (error) {
        res.send({ "msg": error })
    }
})

// --------block student -----//
adminWork.delete("/blockStudent/:id", async (req, res) => {
    let id = req.params.id

    console.log(id)
    try {
        let student = await UserListModel.findByIdAndDelete({ _id: id })
        let newBlockStudent = new BlockListModel({ name: student.name, email: student.email, student_id: student.student_id, image: student.image })
        await newBlockStudent.save()
        res.send({ "msg": `${student.student_id} id's student blocked successfully` })
    } catch (error) {
        res.send({ "msg": error })
    }
})

// --------get blocked students list -----//
adminWork.get("/getBlockedStudents", async (req, res) => {

    try {
        let students = await BlockListModel.find()

        res.send({ "msg": students })
    } catch (error) {
        res.send({ "msg": error })
    }
})

// --------Edit student -----//
adminWork.patch("/editStudent/:id", async (req, res) => {
    let data = req.body
    let id = req.params.id
    try {
        let student = await UserListModel.findByIdAndUpdate({ _id: id }, data)

        res.send({ "msg": `${student.student_id} id's student information updated successfully` })
    } catch (error) {
        res.send({ "msg": error })
    }
})
module.exports = { adminWork }