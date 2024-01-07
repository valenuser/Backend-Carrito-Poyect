const express = require('express')

const router =  express.Router()

const cors = require('cors')
const { corsOptionsDelegate } = require('../app')

const db = require('../database/database')

const env = require('dotenv')

const secret = env.config().parsed.secret

const jwt = require('jsonwebtoken')

router.use(cors({methods:['POST','GET']}))


router.get('/:token',(cors(corsOptionsDelegate)),(req,res)=>{
    if(jwt.verify(req.params.token,secret)){
        const data =  jwt.verify(req.params.token,secret)
        res.status(200).send(data.name)
    }else{
        res.status(404).send(false)
    }
})


router.post('/',(cors(corsOptionsDelegate)),(req,res)=>{
    const { username, password_user } = req.body

    db.query(`select id,username from user where username = '${username}' and password_user = '${password_user}'`,(error,response)=>{
        if(error || response.length == 0){
            res.status(404).send(false)
        }else if(response){
            const id = response[0].id

            db.query(`select token from token where id_user = ${id}`,(error,response)=>{
                if(error){
                    res.status(404).send(error.message)
                }else if(response){
                    res.status(200).json({token:response[0].token})
                }
            })
        }
    })
})


module.exports = router