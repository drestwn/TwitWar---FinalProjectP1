// Happy coding guys
const express = require('express')
const app = express()
const session = require('express-session')
const port = 3000
// const Controller = require('./controllers/controller')
const router = require('./routers/index.js')



app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

app.use(session({
  secret: 'jancok',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite:true 
  }
}))

app.use(router)

app.listen(port, () => {
  console.log(`Iron Man - I Love You ${port}`)
})