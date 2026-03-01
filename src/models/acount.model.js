const mongoose = require("mongoose")


// we use index so we can get the data very fast 
const accountSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"Account must be associated with the user"],
        index:true
    },
    status:{
        enum:{
            value:["ACTIVE","FREEZE","CLOSED"],
            message:"Status can be eather ACTIVE FREEZE CLOSED"
        }
    },
    currency:{
        type:String,
        required:[true,"Currency is require for creating an account"],
        default:"INR"
    },

},{timestamps:true})

// compound index in user and status
// when we find on two field it is could compound index
accountSchema.index({user:1,status:1})



// collection name
const accountModel = mongoose.model("Account",accountSchema)

module.exports = accountModel