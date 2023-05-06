const main = require("../mailer");
const { User, Post } = require("../models/index");
const bcrypt = require('bcryptjs')


class Controller {
  static home(req, res) {
    res.render("home");
  }
//   static renderUserName(req, res) {
//     User.findAll()
//       .then((data) => {
//         console.log(data);
//         res.render("navBar", {data});
//       })
//       .catch((err) => {
//         res.send(err);
//       });
//   }
  static login(req, res) {
    const {error} =req.query

    User.findAll()
        .then(data => {
            res.render("login",{error});
        })
        .catch(err => {
            res.send(err)
        })
    
  }

  static postLogin(req,res){
    // main()
    const {email,password,UserId} =req.body

    User.findOne({
        where:{
         email:email
            }
        })
        .then(user => {
            // console.log(user);
            if(user){
                const isValidPassword = bcrypt.compareSync(password, user.password) //treu /fals
                if(isValidPassword){
                    // req.session.email = {email:user.email,roles:user.roles} //userId = id (set session controller login)
                    req.session.email = user.email
                    req.session.roles = user.roles
                    return res.redirect('/list')
                } else {
                    const error = 'invalid username / password'
                    return res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = 'invalid username / password'
                    return res.redirect(`/login?error=${error}`)
            }
        })
        .catch(err => res.send(err))

  }

  static list(req, res) {
    const{Op} = require('sequelize')
    // main() //untuk package email notif
    const {UserId} = req.query
    const {error} =req.query

    let searchTitle = req.query.searchTitle

    if(!searchTitle){
      searchTitle = ''
    }
  

    Post.findAll({
        include: [{
            model:User  
        }],
        where: {
          title : {[Op.iLike]: `%${searchTitle}%`}
        },
      order: [["createdAt", "Desc"]]
    })
      .then((data) => {
        console.log(data);
        res.render("list", { data, error});
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static postTwit(req, res) {
    const { id } = req.params;
    const { title, content, image,UserId } = req.body;

    Post.create({
      title,
      content,
      image,
      UserId
    })
      .then((data) => {
        res.redirect("/list");
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') {
            err = err.errors.map(el => el.message).join(", ")
        }
        // console.log(err);
        res.send(err);
      });
  }

  static delete(req,res){
    const {id} =req.params

    Post.destroy({
        where: {
            id : id
        }
    })
    .then(data => {
        

        res.redirect('/list')
    })
    .catch(err => {
        res.send(err)
    })
  }

  static logout(req,res){
    req.session.destroy((err) => {
        if(err) res.send(err)
        else {
            res.redirect('/')
        }
    })
  }
}

module.exports = Controller;
