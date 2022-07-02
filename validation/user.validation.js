const Joi = require('joi')

const userValidationSchema = (fields) =>{
    const usrValidation = Joi.object({
        email:Joi.string().min(8).max(24).required(),
        password:Joi.string().min(6).max(32).required()
    })

    const {error,value} = usrValidation.validate(fields)
    return {error,value}
}

module.exports = {userValidationSchema}