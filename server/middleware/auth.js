let {User} = require('./../models/user')
const boom = require('boom')
let authenticate = (req, res, next) => {
  const token = req.header('x-auth')

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject()
    }

    req.user = user
    req.token = token
    next()
  }).catch((e) => {
    res.json(boom.unauthorized(e))
  })
}

module.exports = {authenticate}