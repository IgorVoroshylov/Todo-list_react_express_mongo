const express = require('express')
const mongoose = require('mongoose')
const authRout = require('./routs/authRouts')
const todosRout = require('./routs/todosRouts')
require('dotenv').config()

const app = express()

app.use(express.json({extended: true}))
app.use('/api/auth', authRout)
app.use('/api/todo', todosRout)

async function start() {
   try {
      await mongoose.connect( process.env.MONGO_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      })
      console.log('connect to DB')

      app.listen(process.env.PORT, () => {
         console.log(`Server has been started on port ${process.env.PORT}`)
      })
   } catch (error) {
      console.log(error)
   }
}
start()
