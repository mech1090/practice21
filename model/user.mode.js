const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    collection:'Practice User21'
})

const User = mongoose.model('User',userShema)

module.exports = User