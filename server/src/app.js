const express = require('express')
const path = require('path')
const auth = require("./middleware/auth")
const hbs = require('hbs')
require('./db/mongoose')
const userRouter = require('./routers/user')
const cookieParser = require('cookie-parser')


const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(cookieParser());
app.use(userRouter)
app.use(express.static(publicDirectoryPath))



app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/signin', (req, res) => {
    res.render('signin')
})

app.get("/", auth, (req, res) => {
    res.render("home", {
        cookie: req.cookies?.auth
    })
})

app.get("/home", auth, (req, res) => {
    res.render("home", {
        cookie: req.cookies?.auth
    })
})

app.get('/iat', (req, res) => {
    const vueRenderer = require('./main');
    vueRenderer(req, res);
  });

app.listen(port, () => {
    console.log(`Server is up at port: ${port}`)
})