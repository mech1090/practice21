const User = require('../model/user.mode')

const getEmail = (field) =>{
    return User.findOne(field)
}

const createFields = (fields) =>{
    return User.create(fields)
}

module.exports = {getEmail,createFields}