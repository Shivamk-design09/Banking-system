const express = require("express")
const authmiddleweare = require("../middleware/auth.middleware")
const accountController  = require("../controllers/account.controller")

const router = express.Router()

/**
 * - POST/api/accounts
 * - create new account
 * - Protectd account
 */
router.post("/",authmiddleweare.authmiddleweare,accountController.createAccountController)


module.exports = router

