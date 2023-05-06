const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
// console.log('1')
  // create reusable transporter object using the default SMTP transport
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cubestrike77@gmail.com',
        pass: 'jnugcrvbyaelnujz'
    }
})

  // send mail with defined transport object
  let detail = {
    from: '"TwitWAR" <cubstrike77@gmail.com>', // sender address
    to: "andremakmursetiawan@gmail.com,nafiirfanzidny@gmail.com", // list of receivers
    subject: "Hello ✔, you just logged to your account", // Subject line
    text: "Hello is this you?", // plain text body
    html: "<b>Its you?</b>,<br> if not, your bad. You just lost your account.", // html body
  }

  mailTransporter.sendMail(detail,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('email has been sent')
    }
})
}

module.exports=main