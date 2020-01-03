const sendGrid = require('@sendgrid/mail')
sendGrid.setApiKey(process.env.SENDGRID_API)
const sendwelcomeemail = (email,name)=>{

sendGrid.send({
    to: email,
  from: 'adityadubey1966@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: `hi ${name}and easy to do anywhere, even with Node.js`
})
}

const sendcancellationmail = (email,name)=>{
    sendGrid.send({
        to: email,
  from: 'adityadubey1966@gmail.com',
  subject: 'account is deleated',
  text: `hi ${name}and easy to do anywhere, even with Node.js`

    })
}
module.exports = {
    sendwelcomeemail,
    sendcancellationmail
}