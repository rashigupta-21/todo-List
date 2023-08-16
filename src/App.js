import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  // for input values
  const [todo, setTodo] = useState("");
  //for conditional rendering (add or edit)
  const [isEditing, setIsEditing] = useState(false);
  //to perform edit on which item
  const [newTodo, setNewTodo] = useState({});

  //arrays not read so converting to strings
  useEffect( () =>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]
  );

  //setting input value
  function inputChangeHandler(e) {
    setTodo(e.target.value);
  }

  //todo values submission and saving in local storage
  function handleFormSubmit(e) {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()
        }
      ]);
    }
    setTodo("");
  }

  //deleting todo item
  function onClickDelete(id) {
    const removeTodo = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeTodo);
  }

  //setting edit value
  function editInputHandler(e) {
    setNewTodo({ ...newTodo, text: e.target.value });
    //console.log(newTodo);
  }

  // edit value and update state
  function handleEditFormSubmit(e) {
    e.preventDefault();
    handleUpdateTodo(newTodo.id, newTodo);
  }

  //function to edit and setting value setIsEditing = false
  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }

  //conditional rerendering and setting value setIsEditing = true
  function onClickEdit(todo) {
    setIsEditing(true);
    setNewTodo({ ...todo });
  }

  //conditional rendering on the basis of isEditing variable.
  return (
    <div className="App">

{isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
          <h2>Edit Todo</h2>
          <label htmlFor="editTodo">Edit todo : </label>
          <input
            name="editTodo"
            type="text"
            placeholder="Edit todo"
            value={newTodo.text}
            onChange={editInputHandler}
          />
          <button type="submit">Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) 
      : 
      (
      <form onSubmit={handleFormSubmit}>
      <h2>Add Todo</h2>
      <label htmlFor="todo">Add todo : </label>
        <input
          name="todo"
          type="text"
          placeholder="Create a new Todo"
          value={todo}
          onChange={inputChangeHandler}
        />
        <button type="submit">Add</button>
      </form>
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li 
          key={todo.id}>{todo.text} 
          <button onClick={() => onClickEdit(todo)}>Edit</button>
          <button onClick={() => onClickDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}