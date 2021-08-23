const express = require("express")
const app = express()
const passport = require(`../config/passport`)
const User = require("../models/userModel")
const jwt = require(`jsonwebtoken`)
const { createUserController, getAllUserController, getUserByIDController, updateUserController, deleteUserController } = require("../controllers/userControllers")

const { tokenVerify } = require(`../middlewares/tokenVerify`)

app.post(`/signUp`, createUserController)

app.get(`/getAllUsers`, tokenVerify, getAllUserController)

app.get(`/getUserByID`, tokenVerify, getUserByIDController)

app.put(`/updateUser`, tokenVerify, updateUserController)

app.delete(`/deleteUser`, tokenVerify, deleteUserController)

app.post(`/login`, passport.authenticate(`local`), async(req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id)
    const token = jwt.sign({ user }, process.env.JWTSECRET, { expiresIn: process.env.JWTEXPIRESIN })
    res.status(200).json({ ok: true, user, token })
})

module.exports = app