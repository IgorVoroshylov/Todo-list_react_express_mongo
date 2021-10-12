import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useHistory, useParams } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/httpHook'
import './task.scss'

const Task = () => {
   const TaskId = useParams().id
   const [taskText, setTaskText] = useState('')
   const { request } = useHttp()
   const {token} = useContext(AuthContext)
   const history = useHistory()

   // get task
   const getTask = useCallback( async() => {
      try {
         const data = await request(`/api/todo/task/${TaskId}`, 'get')
         setTaskText(data.text)
      } catch (error) {
         console.log('Task page: ', error)
      }
   }, [ TaskId, request])

   //chenge task
   const sendChenge = useCallback(async (e) => {
      e.preventDefault()

      try {
         await request('/api/todo/update', 'put', {id: TaskId, text: taskText}, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
      } catch (error) {
         console.log('sentChenge: ', error)
      }

      history.push('/')
   }, [request, TaskId, taskText, history, token])

   useEffect(() => {
      getTask()
   }, [getTask]);

   return (
         <div className="row update_form">
            <form className="col s12" onSubmit={sendChenge}>
            <div className="row">
               <div className="input-field col s12">
                  <textarea
                     className="materialize-textarea"
                     value={taskText}
                     name='task'
                     onChange={e => setTaskText(e.target.value)} />

                  <button
                        className='waves-effect waves-light btn blue'
                        type="submit"
                        >Изменить</button>
               </div>
            </div>
            </form>
         </div>
   );
}

export default Task;
