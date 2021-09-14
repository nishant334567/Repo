const jwt = require('jsonwebtoken')
require('dotenv').config()
function auth(req,res,next)
{
    next()
}

module.exports = auth;