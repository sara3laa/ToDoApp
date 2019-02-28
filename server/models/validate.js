const joi = require('joi');


function validateTodo(todo){
    const schema = {
        task: joi.string().min(2).required(),
        _creator: joi.required()
    }
    return Joi.validate(todo,schema);
}


function validateUser(user){
    const schema ={
        name: Joi.string(),
        email: Joi.string().email({ minDomainAtoms: 2 }),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/),
        tokens:[joi.string().required(),joi.string().required()]
    }
    return joi.validate(user,schema);
}

module.exports.validateTodo = validateTodo
module.exports.validateUser = validateUser