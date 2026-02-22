//require doten and config  
// mongo URI will only work in config/db.js after this require
require("dotenv").config()

const connectToDB = require('./src/config/db')
const app = require('./src/app')
// app is requiring from app.js

connectToDB()

app.listen(3000,()=>{
    console.log('server is runnign on port 3000')
})    