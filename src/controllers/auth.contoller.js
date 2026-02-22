const userModel = require("../models/user.model")
const emailService = require('../services/email.service')

const jwt = require("jsonwebtoken")




/** 
* - User register Conteroller
* - POST/api/auth/register
*/
async function userRegisterController(req, res) {

    const { name, email, password } = req.body

    const exitEmail = await userModel.findOne({
        email: email
    })
    if (exitEmail) {
        return res.status(422).json({
            message: "User already exist",
            status: "failed"
        })
    }

    const user = await userModel.create({
        email, name, password
    })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    })

    res.cookie("token", token)

    res.status(201).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name,
        },
        token
    })

    // we will send the email after the user register 

    await emailService.sendRegistrationEmail(user.email,user.name)

}




/** 
* - User Login Conteroller
* - POST/api/auth/login
*/
async function userLoginController(req, res) {
    const { email, password } = req.body

    const user = await  userModel.findOne({ email }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Email or password is Invalid",
            status: "404"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Email or password is Invalid",
            status: "404"
        })
    }

    // generate token 

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token)

    res.status(200).json({
        user:{
            id:user._id,
            email:user.email,
            name:user.name,
        },
        token
    })





}

module.exports = {
    userRegisterController,
    userLoginController
}