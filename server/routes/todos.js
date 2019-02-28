const todos  = require('../controllers/todos');
const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/auth');


router.get('/',authenticate,todos.getTodos)
router.post('/',authenticate,todos.createTodo)
router.patch('/:id',authenticate,todos.updateTodo)
router.delete('/:id',authenticate,todos.deleteTodo)
router.get('/:id',authenticate,todos.getTodos)
module.exports = router; 