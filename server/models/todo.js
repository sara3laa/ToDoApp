let mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
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