import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Trash2 } from 'lucide-react';
import { deleteTodo, updateTodo } from '../features/todoSlice';

const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
}

const statusColor = {
    todo: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    done: 'bg-green-100 text-green-800'
}

const ListView = () => {
    const todos = useSelector((state) => state.todo?.todos);
    const dispatch = useDispatch();
    console.log("todods", todos)


    const updtTodo = (id, status) => {
        dispatch(updateTodo({ id, status }));
    }

    return (
        <div className="space-y-4">
            {todos.map((todo) => (
                <div key={todo.id} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{todo.title}</h3>
                        <div className="flex items-center gap-2">

                            <select
                                value={todo.status}
                                onChange={(e) => updtTodo(todo.id, e.target.value)}
                                className={`px-3 py-1 rounded-lg text-sm border-0 cursor-pointer ${statusColor[todo.status]}`}
                            >
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                            <span className={`px-3 py-1 rounded-full text-sm ${priorityColors[todo.priority]}`}>
                                {todo.priority}
                            </span>
                            <button onClick={() => dispatch(deleteTodo(todo.id))} className="text-red-600 hover:text-red-800">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                    <p className="mt-2 text-gray-600">{todo.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                        {todo.startDate} - {todo.dueDate}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListView