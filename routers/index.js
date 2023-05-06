const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')


router.get('/',Controller.home)  //landing
router.get('/login',Controller.login) //login 
router.post('/login',Controller.postLogin) //login 
router.get('/logout',Controller.logout)

router.use( (req, res, next) => {
    // console.log(req.session);
    if(!req.session.email){
        const error = 'Please login first'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
  })

//UserController
router.get('/list',Controller.list) // table
router.post('/twits/add',Controller.postTwit)

router.use( (req, res, next) => {
    // console.log(req.session);
    if(req.session.email && req.session.roles !== true ){ //salah disini, ini seharusnya buat delete bukan login???
        const error = 'You have no access'
        res.redirect(`/list?error=${error}`)
    } else {
        next()
    }
  })

router.get('/list/:id/delete',Controller.delete)


module.exports = router