import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload)
    },
    deleteTodo: (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
        const { id, text } = action.payload;
        const todo = state.todos.find((todo) => todo.id === id); 
        if (todo) {
          todo.text = text; 
        }
    },
  },
})

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions

const todoReducer = todoSlice.reducer;
export default todoReducer;