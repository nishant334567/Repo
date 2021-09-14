const { User, schema } = require('../models/Users')
const Joi = require('joi')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Post } = require('../models/Posts')
var request = require('request');

router.post('/', async (req, res) => {
    const { error } = schema.validate(req.body)
    if (error) return res.send(error.details[0].message)
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.send("User Already registered")
    user = new User({ name: req.body.name, email: req.body.email, password: req.body.password })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()
    const allPosts = await Post.find().lean()
    // console.log(post);
    const token = user.generateToken()

    res.header('x-auth-token', token).render('dashboard', {
        allPosts,
    })

})

module.exports = router