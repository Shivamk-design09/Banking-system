// we have created a account model for it for bank User
// we are accouring bank model

const accountModel = require("../models/acount.model")
const accountmodel = require("../models/acount.model")
const userModel = require("../models/user.model")

// create a controller which ask the data from user 
// after the data, it creates the account.
// 1) but it will check if the user is logged in or not



// we will have the user id by the help of req.user in authmiddeware

async function createAccountController(req,res){

    const user = req.user

    // here the user have id 
    const account = await accountModel.create({
        user:user._id
    })

     res.status(201).json({
        account
    })
}

module.exports = {
    createAccountController
}