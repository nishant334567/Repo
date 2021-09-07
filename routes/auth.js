const {User} = require('../models/Users')
const {Post} = require('../models/Posts')
const Joi = require('joi')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const schema  = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password:Joi.string().min(5).max(1024).required()
})

router.post('/',async(req,res)=>{
    const { error } = schema.validate(req.body)
    if(error) return res.send(error.details[0].message)
    let user = await User.findOne({email: req.body.email})
    if(!user) return res.send("Invalid Credentials")
    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.send("Invalid Credentials")
    const allPosts = await Post.find().lean()
    res.render('dashboard',{
        allPosts,
    })

})

module.exports = router