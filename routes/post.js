const express = require('express')
const router = express.Router()
const {Post} = require('../models/Posts')

router.post('/add',async(req,res)=>{
    const post = new Post({title:req.body.title, publisher: req.body.publisher, description: req.body.description})
    await post.save()
    res.send(post)
})

// show edit
router.get('/edit/:id',async(req,res)=>{
    const post = await Post.findById({_id:req.params.id}).lean()
    res.render('posts/edit',{
        post,
    })
})

router.put('/edit/:id',async(req,res)=>{
    const post = await Post.findByIdAndUpdate({_id:req.params.id},req.body,{
          new:true,
          runValidators:true
        })
    const allPosts = await Post.find().lean()
    res.render("dashboard",{
        allPosts
    })
})
module.exports = router