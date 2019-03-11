const joi = require('joi');


function validateTodo(todo){
    const schema = {
        task: joi.string().min(2).required(),
        _creator: joi.required()
    }
    return joi.validate(todo,schema);
}

function validateRegister(user){
   const schema ={
        name: joi.string(),
        email: joi.string().email({ minDomainAtoms: 2 }).required(),
        password: joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
    }
    return joi.validate(user,schema);
}
function validateUser(user){
    const schema ={
        name: joi.string(),
        email: joi.string().email({ minDomainAtoms: 2 }),
        password: joi.string().regex(/^[a-zA-Z0-9]{6,30}$/),
        tokens:[joi.string().required(),joi.string().required()]
    }
    return joi.validate(user,schema);
}

module.exports.validateTodo = validateTodo
module.exports.validateUser = validateUser
module.exports.validateRegister = validateRegister;