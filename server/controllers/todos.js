
const Todo = require('../models/todo')
const boom = require('boom')
const {validateTodo} = require('../models/validate')

const {ObjectID} = require('mongodb');

async function createTodo(req,res,next){
    const {error} =validateTodo(req.body)
    if(error) return res.json(boom.badData('invalid data'))
    let todo = new Todo({
        task:req.body.task,
        _create:req.user._id
    })
  await todo.save().then(res.send.bind(res))
  .catch(next)


}

async function  getTodos(req,res){
  await  Todo.find({
        _creator: req.user._id
      }).then((todos) => {
        res.send({todos})
      }, (e) => {
        res.json(boom.badRequest(e))
      })
}
async function getTodo(req,res){
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.json(boom.notFound('missing id'))
  }
  await  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      returnres.json(boom.notFound('missing todo'))
    }

    res.send({todo});
  }).catch((e) => {
    res.json(boom.badRequest(e))
  });
}
async function deleteTodo(req,res){
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.json(boom.notFound('missing'))
  }

  try {
    const todo = await Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    });
    if (!todo) {
      return res.json(boom.notFound('missing'))
    }

    res.send({todo});
  } catch (e) {
    res.json(boom.badRequest(e))
  }
}
async function updateTodo(req,res){
  let id = req.params.id;
  let body = _.pick(req.body, ['task', 'done']);

  if (!ObjectID.isValid(id)) {
    return res.json(boom.notFound('missing'));
  }

  if (_.isBoolean(body.done) && body.done) {
    body.doneAt = new Date().getTime();
  } else {
    body.done = false;
    body.doneAt = null;
  }

  Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.json(boom.notFound('missing'));
    }

    res.send({todo});
  }).catch((e) => {
    res.json(boom.badRequest(e));
  })
}
exports.createTodo = createTodo
exports.getTodo = getTodo
exports.getTodos = getTodos
exports.updateTodo = updateTodo
exports.deleteTodo = deleteTodo


