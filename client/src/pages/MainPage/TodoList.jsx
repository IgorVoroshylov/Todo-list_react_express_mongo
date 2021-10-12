import React from 'react';
import { useHistory } from 'react-router';

const TodoList = ({todoList, deleteTodos, updateTodo}) => {
   const history = useHistory()

   const redirectToTask = (id) => {
      history.push(`/task/${id}`)
   }

   if(todoList.length === 0) return <div>Список пуст!</div>

   return(
      <div className="todos">
         { todoList.map((todo, index) => {
            const todoItemStyles = ["row flex todos-item"]

            if(todo.completed) todoItemStyles.push('completed')
            if(todo.important) todoItemStyles.push('important')

            return(
               <div key={todo._id}>
                  <div className={todoItemStyles.join(' ')} >
                     <div className="col todos-num">{index + 1}</div>
                     <div className="col todos-text">{todo.text}</div>
                     <div className="col todos-buttons">
                        <i className="material-icons blue-text" onClick={() => redirectToTask(todo._id)}>edit</i>
                        <i className="material-icons blue-text" onClick={() => updateTodo(todo._id, 'completed')}>check</i>
                        <i className="material-icons orange-text" onClick={() => updateTodo(todo._id, 'important')}>warning</i>
                        <i className="material-icons red-text" onClick={() => deleteTodos(todo._id)}>delete</i>
                     </div>
                  </div>
               </div>
            )}
         )}
      </div>
   );
}

export default TodoList;
