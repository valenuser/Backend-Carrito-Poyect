const express =  require('express')

const router = express.Router()

const env = require('dotenv')

const secret = env.config().parsed.secret

const db = require('../database/database')

const cors = require('cors')
const { corsOptionsDelegate } = require('../app')

const jwt = require('jsonwebtoken')

const sendMail =  require('../email/mail')

const  buildPDF  = require('../pdf/pdfConstructor.js')


router.use(cors({methods:['GET','POST']}))


router.post('/',(cors(corsOptionsDelegate)),(req,res)=>{
    let datos = req.body

    if(jwt.verify(datos[datos.length-1].token,secret)){
        const data =  jwt.verify(datos[datos.length-1].token,secret)
        const user_id = data.sub

        db.query(`select email,username from user where id = ${user_id}`,(error,response)=>{
            if(error){
                res.status(404).send(false)
            }else{
                const email = response[0].email
                const username = response[0].username

                buildPDF(datos,username)

                sendMail(email)

                res.status(200).send(true)

            }
        })
    }
})



module.exports = router