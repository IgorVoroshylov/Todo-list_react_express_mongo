const { Router } = require('express')
const router = Router()
const Todo = require('../models/todos')
const authMidleware = require('../middleware/authMidleware')

// add task
router.post('/add', async (req, res) => {
   try {
      const { text, userId } = req.body

      const todo = new Todo({
         owner: userId,
         text,
         completed: false,
         important: false
      })

      await todo.save()

      res.json({todo})
   } catch (error) {
      console.log(error)
   }
})

// get all tasks
router.get('/', authMidleware, async (req, res) => {
   try {
      const todosList = await Todo.find({owner: req.user.userId}).sort({createdAt: -1})

      res.json(todosList)
   } catch (error) {
      console.log(error)
   }
})

// get task
router.get('/task/:id', async (req, res) => {
   const id = req.params.id
   try {
      const todo = await Todo.findById(id)

      res.json(todo)
   } catch (error) {
      console.log(error)
   }
})

// chenge task_info
router.put('/completed', async (req, res) => {
   try {
      const { id } = req.body

      const todo = await Todo.findOne({_id: id})

      todo.completed = !todo.completed

      await todo.save()

      res.json(todo)
   } catch (error) {
      console.log(error)
   }
})

router.put('/important', async (req, res) => {
   try {
      const { id } = req.body

      const todo = await Todo.findOne({_id: id})

      todo.important = !todo.important

      await todo.save()

      res.json(todo)
   } catch (error) {
      console.log(error)
   }
})

// update task
router.put('/update', authMidleware, async (req, res) => {
   try {
      const { id, text } = req.body

      const todo = await Todo.findByIdAndUpdate(id, {text})

      await todo.save()

      res.json({messages: 'ok'})
   } catch (error) {
      console.log(error)
   }
})

// deleted
router.delete('/delete/:id', async (req, res) => {
   try {
      const todosList = await Todo.findByIdAndDelete({_id: req.params.id})

      res.json(todosList)
   } catch (error) {
      console.log(error)
   }
})

module.exports = router