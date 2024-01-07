const express = require('express')

const router =  express.Router()

const cors = require('cors')
const { corsOptionsDelegate } = require('../app')

router.use(cors({methods:['GET']}))

const db = require('../database/database')


router.get('/',(cors(corsOptionsDelegate)),(req,res)=>{
    db.query('select * from productos',(error,response)=>{
        if(error){
            res.status(404).send(error.message)
        }else if(response){
            res.status(200).send(response)
        }
    })
})

router.get('/:id',(req,res)=>{
    console.log(req.params.id);
    db.query(`select * from productos where id = ${req.params.id}`,(error,response)=>{
        if(error){
            console.log(error.message)
            res.status(400).send(false)
        }else{
            console.log(response)
            res.status(200).send(response)
        }
    })
})

router.get('/buscar/:product',(req,res)=>{
    console.log(req.params.product);
    db.query(`select * from productos where product_name = '${req.params.product}'`,(error,response)=>{
        if(error){
            console.log(error.message)
            res.status(400).send(false)
        }else{
            console.log(response)
            res.status(200).send(response)
        }
    })
})



module.exports = router