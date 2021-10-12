import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/httpHook'
import './mainPage.scss'
import Todolist from './TodoList'

const MainPage = () => {
   const { userId, token, logOut } = useContext(AuthContext)
   const [ task, setTask ] = useState('')
   const [ todoList, setTodoList ] = useState([])
   const { error, request } = useHttp()

   if(error) {
      console.log(error)
      logOut()
   }

   // set
   const setTodos = useCallback( async () => {
      try {
         const response = await request('/api/todo', 'get', {
            headers: {
               Authorization: `Bearer ${token}` // передаем токен, чтоб на сервере из него получит id
            }
         })

         setTodoList(response)
      } catch (error) {
         console.log('setTodos: ', error)
      }
   }, [token, request])

   // add task
   const addTask = useCallback(async (e) => {
      e.preventDefault()
      if(!task) return null
      try {
         await request('/api/todo/add', 'post', {text: task, userId}) // userId можно не передавать, но нужно будет отправить header: Authorization: `Bearer ${token}`
      } catch (error) {
         console.log('submitForm: ', error)
      }

      setTask('')
      setTodos()
   }, [task, userId, setTodos, request])

   // update
   const updateTodo = useCallback(async (id, changeValue) => {
      try {
         await request(`/api/todo/${changeValue}`, 'put', {id})
      } catch (error) {
         console.log('submitForm: ', error)
      }

      setTodos()
   }, [setTodos, request])

   // delete
   const deleteTodos = useCallback(async (id) => {
      try {
         await request(`/api/todo/delete/${id}`, 'delete')
   
         setTodos()
      } catch (error) {
         console.log('removeTodos: ', error)
      }
   }, [setTodos, request])

   useEffect(() => {
      setTodos()
   }, [setTodos])

   return (
      <div className='container'>
         <div className="main-page">
            <h4>Добавить задачу</h4>
            <form className='form form-login' onSubmit={addTask}>
               <div className="row">
                  <div className="input-field col s12">
                     <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        name="task"
                        id="text"
                        className='validate'/>
                     <label htmlFor="text">Задача</label>
                  </div>
               </div>

               <div className="row">
                  <button className='waves-effect waves-light btn blue'>Добавить</button>
               </div>
            </form>

            <h3>Активные задачи:</h3>
            <Todolist
               todoList={todoList}
               deleteTodos={deleteTodos}
               updateTodo={updateTodo} />
         </div>
      </div>
   );
}

export default MainPage;