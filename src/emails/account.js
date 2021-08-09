const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'Mahmoudamer95.bird@gmail.com',
        subject: 'Welcome to the family',
        text: `Welcome to the app, ${name}. let me know how you get along with the app.`
    })
}

const sendByeByeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'Mahmoudamer95.bird@gmail.com',
        subject: 'Sad to cya go',
        text: `Bye ${name}, cya later`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendByeByeEmail
}