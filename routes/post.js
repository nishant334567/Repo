const express = require('express')
const router = express.Router()
const {Post} = require('../models/Posts')
const auth = require('../middleware/auth')

router.get("/add",(req,res)=>{
    res.render("posts/add")
})

router.post('/add',async(req,res)=>{
    const post = new Post({title:req.body.title, publisher: req.body.publisher, description: req.body.description.replace(/<[^>]*>?/gm, '')})
    await post.save()
    res.redirect("/")
})

router.get("/:id",async(req,res)=>{
    const post = await Post.findById(req.params.id).lean();
    // console.log(post);
    res.render("single_post",{
        post,
    })
})



// show edit
router.get('/edit/:id',async(req,res)=>{
    const post = await Post.findById({_id:req.params.id}).lean()
    res.render('posts/edit',{
        post,
    })
})

router.put('/edit/:id',auth,async(req,res)=>{
    // console.log(req.body.description);
    const post = await Post.updateOne({_id:req.params.id},{title:req.body.title, publisher: req.body.publisher, description: req.body.description.replace(/<[^>]*>?/gm, '')},{
          new:true,
          runValidators:true
        })
    const allPosts = await Post.find().lean()
    res.redirect("/")
})

router.delete("/:id",async(req,res)=>{
    // console.log("I AM DELETED");
    const posts = await Post.findOneAndDelete({_id:req.params.id})
    // console.log(posts);
    res.redirect('/');
})
module.exports = router