//file linking
require ('./db/mongoose')
const User = require('./db/models/user')
//frameworks init
const express = require('express')
const expressValidator = require('express-validator')
const expressSession = require('express-session')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const MongoStore = require('connect-mongo')(expressSession);
const flash = require('connect-flash')


const EIGHT_HOURS = 1000 * 60 * 60 * 8 // 8 hours in miliseconds




//Function to create user
const createuser = async (data) =>{
    try{
    const user = new User(data)
    await user.save()
    console.log(user)
    }
    catch(error){
        console.log(error)
    }

}
//Calling function example
// createuser({
//     name: "Szymon",
//     surname: "Tokarski",
//     password: "tajnehaslo",
//     login: "tokarss1"
// })

//Function to print users in db
const findUsers = async () => {
    try{
        const users = await User.find({})
        console.log(users)
    }
    catch(error){
        console.log(error)
    }
}


//findUsers()    //uncomment to see all users in db


const port = process.env.PORT || 8000;

const app = express();
app.use(express.static('public')) // Static files linking

//App uses
app.use(express.urlencoded({ extended: false}))
app.use(expressSession({
    secret: 'ssh814/ascerettop12',
    saveUninitialized: false,
    resave: false,
    name: 'sid',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
        maxAge: EIGHT_HOURS,
        sameSite: true,
        secure: false,         // TODO: change to true while release

}}))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(flash());

// app uses end


app.set('view engine', 'hbs'); //Declaring HBS view engine


//custom functions

const redirectedLogin = (req, res, next) =>{
    if(!req.session.userID){
        console.log("redictered session ID: " + req.session.userID)
        res.redirect('/')
    }else next()
}

const checkAdmin = async (req, res, next) =>{
try{
let query = await User.find({_id: req.session.userID}).exec()
console.log(req.session.userID)
console.log(query[0])
if(!query[0].is_admin) res.redirect('/')
else next()}
catch(error) {
    console.log(error)
    res.redirect('/')}

}
// Login(index) page rendering
app.get('/', (req,res) =>{
    if(req.session.userID) res.redirect('/break')
    res.render('index',{
        pageTitle: 'Centrica Break Tool',
        message: 'test'
    });
})

// Main(break) page rendering
app.get('/break',redirectedLogin, (req,res) =>{
    if(!req.session.userID)res.redirect('/')
    else res.render('break',{
    })
})

// Adminpage rendering
app.get('/admin',checkAdmin, (req,res) =>{
    res.render('admin',{
    });
})

// New user registering page rendering
app.get('/newuser',checkAdmin, (req,res) =>{
    res.render('newuser',{
    });
})

// Main page post 
app.post('/', (req,res) =>{
    const { login, password } = req.body
    var Login = async () => {
        try{
            var query = await User.find({
                login: login,
                password: password

            }).exec()
            if(query[0]._id){
                req.session.userID = query[0]._id
                console.log(req.session.userID)
                if(query[0].is_admin) return res.redirect('/admin')
                else return res.redirect('/break')} 
            else return res.redirect('/')
        }
        catch(error){
            console.log("Login failed " + login)
            return res.redirect('/')
            
        }
    }
    Login()
  
})

//Register user POST
app.post('/newuser',(req, res) =>{
    const { name, surname, login, password} = req.body
    try{
    createuser({
    name: name,
    surname: surname,
    password: password,
    login: login
})

return res.redirect('/newuser')
}
    catch(error)
    {
        console.log(error)
        return res.redirect('/newuser')
    }
})

app.listen(port);
console.log("Server running...")