const {userValidationSchema} = require('../validation/user.validation')
const userService = require('../service/user.service')
const bcrypt = require('bcrypt')
const config = require('config')
const { has } = require('config')


const getLoginForm = (req,res)=>{
    return res.render('login/layout')
}

const login = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const {error,value} = userValidationSchema(fields)
    if(error){
        return res.render('login/layout',{message:error.details[0].message})
    }
    const findUser = await userService.getEmail({email})
    if(!findUser){
        return res.render('signup/layout',{message:'User not exist Signup'})
    }
    const matchPassword = await bcrypt.compare(password,findUser.password)
    if(!matchPassword){
        return res.render('login/layout',{message:'Credentials Wrong'})
    }
    return res.render('user/layout')

}

const getSignupForm = (req,res)=>{
    return res.render('signup/layout')
}

const signup =async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const {error,value} = userValidationSchema(fields)
    if(error){
        return res.render('signup/layout',{message:error.details[0].message})
    }
    const findUser = await userService.getEmail({email})
    if(findUser){
        return res.render('login/layout',{message:'User exist Login Here'})
    }
    const hashPassword = await bcrypt.hash(password,config.get('hash.salt'))
    const createUser = await userService.createFields({email,password:hashPassword})
    return res.render('signup/layout',{message:'User Created'})

}

module.exports = {getLoginForm,login,getSignupForm,signup}