const express = require('express')
const cors = require('cors')
const config = require('config')
const mongoose = require('mongoose')
const userPage = require('./routes/user.routes')
require('./db')

const app = express()

app.use(express())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use('/user',userPage)

app.set('view engine','pug')
app.set('views','./views')

app.get('/',(req,res)=>{
    res.send('TESTING OKK')
})

app.get('*',(req,res)=>{
    res.send('BAD_REQUEST')
})

mongoose.connection.once('open',()=>{
    app.listen(config.get('port'),()=>{
        console.log(`Server running on port ${config.get('port')}`)
    })

    console.log('DB Connected')
})

