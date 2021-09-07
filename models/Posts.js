const Joi = require('joi')
const mongoose  = require('mongoose')


const postSchema  = new mongoose.Schema({
    title:{
        type:String,
        max:[30,'Max allowed length is 30']
    },

    createdAt:{
        type:Date,
        default:Date.now()
    },
    publisher:{
        type:String,
        default:"Anonymous",
        min:[4,"Min publisher name should be 4 characters"],
        max:[30,'Max allowed length is 30']
    },
    description:{
        type:String,
    }
})

const Post = mongoose.model('Post',postSchema)
exports.Post = Post