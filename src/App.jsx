import React, { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import KanbanView from './components/KanbanView.jsx';
import GanttView from './components/GanttView.jsx';
import ListView from './components/ListView.jsx';
import { LayoutGrid, List, Baseline as Timeline } from 'lucide-react';

function App() {
  const [activeView, setActiveView] = useState("list");
  return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Task Manager</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveView('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeView === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <List size={20} />
                List View
              </button>
              <button
                onClick={() => setActiveView('kanban')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeView === 'kanban'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <LayoutGrid size={20} />
                Kanban View
              </button>
              <button
                onClick={() => setActiveView('gantt')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeView === 'gantt'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Timeline size={20} />
                Gantt View
              </button>
            </div>
          </div>

          <TodoForm />

          <div className="mt-6">
            {activeView === 'list' && <ListView />}
            {activeView === 'kanban' && <KanbanView />}
            {activeView === 'gantt' && <GanttView />}
          </div>
        </div>
      </div>
  );
}

export default App;