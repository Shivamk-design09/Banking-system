const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:[true,"Email is required for creating acoung"],
        trim:true,
        lowerCase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid Email address"],
        unique:[true,"Email already exists"]
    },
    name:{
        type:String,
        require:[true,"Please Enter your name"],
    },
    password:{
        type:String,
        require:[true,'Password is require'],
        minlength:[6,"length should be atlease 6 character"],
        select:false
    },

},{timestamps:true})



//if userdata is saved this function will run 
// if pass is change hash it

userSchema.pre("save",async function () {
    //if password is not modified
    if(!this.isModified("password")){
        return
    }

    // if password is modified
    const hashPassword = await bcrypt.hash(this.password,10)
    this.password = hashPassword
    return
})
   
userSchema.methods.comparePassword = async function(password){

    return await bcrypt.compare(password,this.password)
    
}

const userModel = mongoose.model("user",userSchema)

module.exports = userModel