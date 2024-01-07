const express = require('express')


const router =  express.Router()

const jwt = require('jsonwebtoken')

const db = require('../database/database')

const cors = require('cors')

const env = require('dotenv')

const secret = env.config().parsed.secret

const corsOptions = require('../app').corsOptionsDelegate

router.use(cors({methods:['POST']}))

router.post('/',(cors(corsOptions)),(req,res)=>{

    const { username, email ,password_user } = req.body

    console.log({user:username,email:email,password:password_user});

    db.query(`insert into user(username,email,password_user) values ('${username}','${email}','${password_user}')`,(error,response)=>{
        if(error){
            res.status(404).send(error)
        }
        
        db.query(`select id,username from user where username = '${username}' and password_user = '${password_user}'`,(error,response)=>{
            if(error){
                res.status(404).send(error)
            }else if(response){
                const sub =  response[0].id
                const name = response[0].username
                const token = jwt.sign({
                    sub,
                    name,
                    exp:Date.now() + 365000 * 1000 
                }, secret)

                db.query(`insert into token(id_user,token) values (${sub},'${token}')`,(error,response)=>{
                    if(error){
                        res.status(404).send(error)
                    }else if(response){
                        res.status(200).send('ok')
                    }
                })
            }
        })
    })
})



module.exports = router