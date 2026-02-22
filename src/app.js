// app is used in creating server 
// and app is used in  adding middleware

const express = require("express")
const authRouter = require('./routes/auth.route')
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())

app.use(cookieParser())
app.use("/api/auth",authRouter)

// server instant is save in app
// server will start in server.js

//export server
module.exports = app

