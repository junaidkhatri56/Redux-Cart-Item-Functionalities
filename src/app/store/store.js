import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../../features/todo/todoSlice"; // No destructuring since it's a default export

export const store = configureStore({
  reducer: {
    todo: todoReducer, // Assign the reducer to the 'todo' slice
  },
});
