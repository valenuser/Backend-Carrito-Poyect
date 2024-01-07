const express = require('express')

const router =  express.Router()

const nodemailer = require('nodemailer')

const fs = require('fs')

const env = require('dotenv')

const fileDir = env.config().parsed.fileDir

const userEmail = env.config().parsed.useremail

const sendMail = (data) =>{

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:userEmail,
            pass:env.config().parsed.passwordMail
        }
    })

    const mailOptions = {
        from:userEmail,
        to:data,
        subject:'Purchase invoice',
        text:'Thank you for trusting us, here is the receipt of your purchase!',
        attachments: [{
            filename: 'receive.pdf',
            path:fileDir,
            contentType: 'application/pdf'
          }]
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });


}


module.exports = sendMail