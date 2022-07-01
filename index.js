const express = require('express')
const cors = require('cors')
const config = require('config')
const mongoose = require('mongoose')
require('./db')

const app = express()

app.use(express())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

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

