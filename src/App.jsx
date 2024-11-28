import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "./features/todo/todoSlice";

const App = () => {
  const newTodoRef = useRef(null); // Reference for the add input
  const editTodoRef = useRef(null); // Reference for the edit input
  const [editId, setEditId] = useState(null); // State for tracking the todo being edited

  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-md mt-20">
      <h1 className="text-2xl font-bold text-center mb-6">To-Do App</h1>

      {/* Add Todo Section */}
      <div className="flex items-center gap-4 mb-6">
        <input
          ref={newTodoRef}
          placeholder="Add a new todo"
          className="flex-grow p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={() => {
            const text = newTodoRef.current.value;
            if (text) {
              dispatch(addTodo({ id: Date.now(), text }));
              newTodoRef.current.value = ""; // Clear the input field
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {/* Edit Todo Section */}
      {editId && (
        <div className="flex items-center gap-4 mb-6">
          <input
            ref={editTodoRef}
            placeholder="Edit todo"
            className="flex-grow p-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
          />
          <button
            onClick={() => {
              const text = editTodoRef.current.value;
              if (text) {
                dispatch(editTodo({ id: editId, text }));
                setEditId(null); // Exit edit mode
              }
            }}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
          >
            Save
          </button>
        </div>
      )}

      {/* Todo List */}
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-4 bg-white border rounded-md shadow-sm"
          >
            <span className="text-gray-800">{todo.text}</span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditId(todo.id);
                  editTodoRef.current.value = todo.text; // Set current value in edit input
                }}
                className="px-2 py-1 text-sm bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="px-2 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
