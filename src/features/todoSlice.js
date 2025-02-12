import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                ...action.payload,
            };
            state.todos.push(newTodo);
        },

        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },

        updateTodo: (state, action) => {
            const { id, status } = action.payload;
            const todoToUpdate = state.todos.find(todo => todo.id == id);
            if (todoToUpdate) {
                todoToUpdate.status = status;
            }
        },
    },
});

export const { 
    addTodo, 
    deleteTodo, 
    updateTodo 
} = todoSlice.actions;
export default todoSlice.reducer;