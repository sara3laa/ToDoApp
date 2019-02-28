let mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
  task: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  done: {
    type: Boolean,
    default: false
  },
  doneAt: {
    type: Date,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {Todo};