"use client"; 
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [todos, setTodos] = useState(null); 
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const todo = { title: newTodo, completed: false };

    try {
      const res = await axios.post("https://jsonplaceholder.typicode.com/todos", todo);
      setTodos([res.data, ...todos]);
      setNewTodo("");
    } catch (err) {
      console.error("Error adding todo", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Add a new task..."
        />
        <button onClick={addTodo} className="bg-green-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      
      {/* "Loading..." */}
      {!todos ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{todo.title}</span>
              <button onClick={() => deleteTodo(todo.id)} className="bg-[#d3442e] text-white px-3 py-1 rounded">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
