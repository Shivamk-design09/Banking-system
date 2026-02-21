// require mongoose 
// then connect db
// use .then and .catch for error handling here in function 
const mongoose = require("mongoose")


function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server connectd to database ")
    })
    .catch(err=>{
        console.log("Error connect to database")
        process.exit(1)
    })
}

module.exports = connectToDB