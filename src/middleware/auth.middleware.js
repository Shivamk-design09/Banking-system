// it will check if user is logged in or not by the token 

const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')


async function authmiddleweare(req, res, next) {

    // find the token in the cookies
    //we have set the token in cookies in auth.middleware
    const token = req.cookies.token || req.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized token or token is missing",
        })
    }

    try {

        // we are getting the token and it will be in decoded variable
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // decoded will get the userId 
        // here userId is genereated by the mongodb//._id
        //find the user by Id
        const user = await userModel.findById(decoded.userId)

        req.user = user

        return next()

    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized token or token is missing"
        })
    }
}

module.exports= {
    authmiddleweare
}