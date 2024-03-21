import React, { useState } from 'react'
import './App.css'
import { Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo } from './Slices/todoSlice';


function App() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const handleAdd = () => {
    if (text.trim() !== '') {
      dispatch(addTodo({
        id: Date.now(),
        text,
        completed: false,
      }));
      setText('');
      toast.success(`${text} is add to Todoslist` )
    }
  };

  const handleDelete = id => {
    dispatch(deleteTodo(id));
    toast.warning(`${text} is deleted from Todoslist`)
  };
  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };




  const completedTodosCount = todos.filter(todo =>todo.completed).length;
  

 
 

  return (
    <>
     <div className='container mt-5'>
          <h1>My Todo List</h1>
            <div className='d-flex'>
              <input type="text" placeholder='add todo' onChange={e =>setText(e.target.value)} />
              <button onClick={handleAdd} className='btn btn-primary ms-2'>Submit</button>
            </div>
        <div className='mt-5'>
        {todos.map(todo => (
          <div key={todo.id} className='d-flex justify-content-between align-items-center border mb-2'>
          <Form className='mt-3'>
        {['checkbox'].map((type) => (
          <div key={`todo`} className="mb-3">
            <Form.Check 
              type={type}
              id={`default-${type}`}
              label={todo.text} 
            />
            </div>
        ))}
      </Form>
      <button onClick={()=>handleDelete(todo.id)} className='btn btn-danger'>delete</button>
     
          </div>
        ))}
    </div>
      {
      completedTodosCount > 0 && <p>Number of completed todos: {completedTodosCount}</p>
      }
    <ToastContainer position='top-center' autoClose={3000} />
     </div>
    </>
  )
}

export default App
