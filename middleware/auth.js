const jwt = require('jsonwebtoken')
require('dotenv').config()
function auth(req,res,next)
{
    if(req.cookies.username)
    {
        console.log(req.cookies);
        next()
    }
    else{
        // alert("You Must Login First")
        console.log("else");
        return res.redirect("/");
    }
}

module.exports = auth;