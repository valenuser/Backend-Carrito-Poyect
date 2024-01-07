const express =  require('express')

const app =  express()


app.use(express.urlencoded({extended: true}))
app.use(express.json())

const whiteList = ['http://localhost:8080']

const corsOptionsDelegate = (req,callback)=>{
    let corsOptions;
    if(whiteList.indexOf(req.header('Origin')) !== -1){
        corsOptions = {origin: true}
    }else{
        corsOptions = {origin: false}   
    }
    callback(null,corsOptions)
}


app.use('/login',require('./routes/login.js'))
app.use('/register',require('./routes/register.js'))
app.use('/productos',require('./routes/productos.js'))
app.use('/comprar',require('./routes/comprar.js'))


app.listen(3000,(req,res)=>{
    console.log('RUNNING ON PORT 3000');
})

module.exports = {app:app,corsOptionsDelegate:corsOptionsDelegate}