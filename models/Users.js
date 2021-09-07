const Joi = require('joi')
const mongoose  = require('mongoose')


const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min: [5,'Must be atleast 5 characters long'],
        max:[255,'Input NAME string too long']
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min: [5,'Password must be atleast 5 characters long'],
        max:[1024,'Too Long']
    },
    isAdmin:{
        type: Boolean,
        default: false
    }

})

const schema  = Joi.object({
    name:Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required(),
    password:Joi.string().min(5).max(1024).required()
})

const User = mongoose.model('user',userSchema)

exports.User = User
exports.schema = schema