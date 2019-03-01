require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')
const users = require('./routes/users')
const todos = require('./routes/todos')
const port = process.env.PORT || 3000;
let app = express()
app.use(bodyParser.json())
app.use(express.json())
 app.use('/users',users)
 app.use('/todos',todos)


app.listen(port, () => console.log(`Listening on port ${port}...`))
