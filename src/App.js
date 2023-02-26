// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";
import { v4 } from "uuid"

const LOCAL_STORAGE_KET = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  function toggleTodo(id) {
    const newTodos = [...todos]
    let todo = newTodos.find(item => item.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KET))
    if (storedTodos) {
      setTodos(prevTodos => {
        return [...prevTodos, ...storedTodos]
      })
    }
  }, [])
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KET, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e) {
    let name = todoNameRef.current.value
    if (name === '') return
    todoNameRef.current.value = null
    setTodos(prevTodos => {
      return [...prevTodos, { id: v4(), name: name, complete: false }]
    })
  }
  function handleClearTodo() {
    setTodos([])
  }
  return (
    <> <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear Completed todos</button>
      <div>{todos.filter(item => !item.complete).length} left to do</div>
    </>
  )
}

export default App;
