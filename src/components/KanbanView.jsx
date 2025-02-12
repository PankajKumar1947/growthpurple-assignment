import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Trash2 } from 'lucide-react';
import { deleteTodo, updateTodo } from '../features/todoSlice';

const priorityColors ={
    high: 'border-red-500',
    medium: 'border-yellow-500',
    low: 'border-green-500'
}

const KanbanView = () => {
    const todos = useSelector((state) => state.todo?.todos)
    const dispatch = useDispatch();

    const [todo, setTodo]= useState({});

    const columns = [
        { id: 'todo', title: 'To Do' },
        { id: 'in-progress', title: 'In Progress' },
        { id: 'done', title: 'Done' }
    ];

    const handleDragStart = (e, todo) => {
        setTodo(todo);
        
        const draggedElement = e.target;
        draggedElement.classList.add('opacity-50');
    };

    const handleDragEnd = (e) => {
        const draggedElement = e.currentTarget;
        draggedElement.classList.remove('opacity-50');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        const column = e.currentTarget;
        column.classList.add('bg-gray-200');
    };

    const handleDragLeave = (e) => {
        const column = e.currentTarget;
        column.classList.remove('bg-gray-200');
    };

    const handleDrop = (e, newStatus) => {
        e.preventDefault();
        const column = e.currentTarget;
        column.classList.remove('bg-gray-200');

        if (todo.status !== newStatus) {
            const id = todo.id;
            dispatch(updateTodo({ id, status:newStatus }));
        }
    };
    return (
        <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
                <div
                    key={column.id}
                    className="flex-shrink-0 w-80 min-h-screen"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, column.id)}
                >
                    <div className="bg-gray-100 p-4 rounded-lg transition-colors duration-200">
                        <h3 className="font-semibold mb-4">{column.title}</h3>
                        <div className="space-y-3">
                            {todos
                                .filter((todo) => todo.status === column.id)
                                .map((todo) => (
                                    <div
                                        key={todo.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, todo)}
                                        onDragEnd={handleDragEnd}
                                        className={`bg-white p-3 rounded shadow-sm border-l-4  ${priorityColors[todo.priority]} cursor-move hover:shadow-md transition-shadow duration-200`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-medium">{todo.title}</h4>
                                            <button
                                                onClick={() => dispatch(deleteTodo(todo.id ))}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">{todo.description}</p>
                                        <div className="mt-2 text-xs text-gray-500">
                                            {todo.startDate} - {todo.dueDate}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default KanbanView