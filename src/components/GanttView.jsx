import React from 'react'
import { useSelector } from 'react-redux';

const statusColor = {
    todo: 'bg-gray-500',
    'in-progress': 'bg-blue-500',
    done: 'bg-green-500'
}

const GanttView = () => {
    const todos = useSelector((state)=>state.todo?.todos);

    const today = new Date();
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysInMonth = monthEnd.getDate();

    const getDatePosition = (startDate) => {
        const taskDate = new Date(startDate);
        const dayOfMonth = taskDate.getDate();
        return `${(dayOfMonth / daysInMonth) * 100}%`;
    };

    const getTaskWidth = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        console.log(start.getTime())

        //const days = (end.getDate() - start.getDate());// handle for only one month duration
        const days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
        
        return `${(days / daysInMonth) * 100}%`;
    };
    
    return (
        <div className="overflow-x-auto">
            <div className="min-w-[800px]">
                <div className="flex mb-4">
                    <div className="w-1/4 p-2 font-semibold">Task</div>
                    <div className="w-3/4 flex">
                        {Array.from({ length: daysInMonth }, (_, i) => (
                            <div key={i} className="flex-1 text-center text-xs">
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="">
                    {todos.map((todo) => (
                        <div key={todo.id} className="flex items-center">
                            <div className="w-1/4 p-2 border-y h-14 border-gray-300">
                                <div className="font-medium">{todo.title}</div>
                                <div className="text-xs text-gray-500">{todo.status}</div>
                            </div>
                            <div className="w-3/4 h-14 relative border-y border-gray-300">
                                <div
                                    className={`absolute h-10 top-2 rounded ${statusColor[todo.status]}`}
                                    style={{
                                        left: getDatePosition(todo.startDate),
                                        width: getTaskWidth(todo.startDate, todo.dueDate),
                                    }}
                                >
                                    <div className="px-2 text-xs text-white flex items-center h-full">
                                        {todo.title}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GanttView