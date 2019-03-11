const {User} = require('../models/user')
const {validateUser,validateRegister} = require('../models/validate')
const boom = require('boom')
const {mongoose} = require('../db/mongoose');
const _ = require('lodash');
const {ObjectID} = require('mongodb')

async function registerUser(req,res){
    const {error} = validateRegister(req.body)
    if(error) return res.json(boom.notFound(error))
    const body = _.pick(req.body, ['email', 'password','name'])
    const user =  new User(body);
    await user.save();
    const token = await user.generateAuthToken()
    res.header('x-auth', token).send(user)
}
async function loginUser(req,res){
    const {error} = validateUser(req.body)
    if(error) return res.json(boom.notFound('missing'))
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password)
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
}
async function logoutUser(req,res){
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
      } catch (e) {
        res.status(400).send();
      }
}

// exports.registerUser = registerUser
// exports.loginUser = loginUser
// exports.logoutUser = logoutUser

module.exports = {
  registerUser,
  loginUser,
  logoutUser
}