const express = require('express')
const mongoose = require('mongoose')
const User = require('./routes/user')
const Auth = require('./routes/auth')
const Post = require('./routes/post')
const methodOverride = require('method-override')
const path = require('path')
const app = express()
const exphbs = require('express-handlebars')
app.use(express.json())
app.use(express.urlencoded({extended: true}));

const { formatDate } = require('./helpers/hbs')

app.engine('.hbs',exphbs({ helpers:{formatDate}, extname: '.hbs'}))
app.set('view engine','.hbs')

mongoose.connect("mongodb://localhost:27017/final_db")
    .then(()=>{console.log("Connecting DB successfully")})
    .catch(err=>{console.log(err.message);})

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
    }))

const public = path.join(__dirname,"public")

app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'home.html'));
});
app.use('/auth/users',User)
app.use('/auth/auth',Auth)
app.use('/post',Post)

app.listen(5000,()=>{console.log("Listening on 5000...")})