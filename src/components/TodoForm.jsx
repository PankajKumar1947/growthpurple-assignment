import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoSlice';

export function TodoForm() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'todo',
        startDate: '',
        dueDate: '',
        priority: 'medium'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTodo(formData));
        setFormData({
            title: '',
            description: '',
            status: 'todo',
            startDate: '',
            dueDate: '',
            priority: 'medium'
        });
        setIsOpen(false);
    };

    return (

        <div className="mb-6">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <Plus size={20} />
                    Add New Task
                </button>
            ) : (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/50 transition-opacity" />
                    <div className="relative z-50 w-full sm:max-w-[75%] overflow-y-auto max-h-[90vh] rounded-lg bg-white  p-6 shadow-xl">
                        <h2 className='text-center text-2xl font-semibold mb-4'>Add New Task</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Task Title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <textarea
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Due Date</label>
                                        <input
                                            type="date"
                                            value={formData.dueDate}
                                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>
                                </div>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Add Task
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}