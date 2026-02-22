const express = require("express")
const authController = require("../controllers/auth.contoller")

const router = express.Router()

/* POST /api/auth/register*/
router.post("/register", authController.userRegisterController)

/* GET /api/auth/login*/
router.post("/login",authController.userLoginController)

module.exports = router 