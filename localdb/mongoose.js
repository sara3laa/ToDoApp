var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


let Todo =mongoose.model('Todo',{
    task:{
        type:String
    },
    done:{
        type:Boolean
    },
    doneAt:{
        type:Date
    }

})
let User = mongoose.model('User',{
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})
let newTodo = new Todo({
   task:'payMe task',
   done:false
});
let newUser= new User({
        name:'sara alaa',
        email:'sara3laa.93@gmail.com',
        password:'1234'
})
newTodo.save().then((doc)=>{
    console.log('success',doc);
},(e)=>{console.log('failed to add new todo')});
 newUser.save().then((doc)=>{
     console.log('sucess',doc);
 },(e)=>{
     console.log('failed to add new user');
 })