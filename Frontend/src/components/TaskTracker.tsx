import React, { Suspense } from 'react';
import { CheckCircle2, ListTodo, Sparkles } from 'lucide-react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const TaskTracker: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Clean Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary rounded-lg">
            <ListTodo className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">
            Task Tracker
          </h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Task Form Sidebar */}
          <div className="lg:col-span-4">
            <div className="task-form-container">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-medium text-foreground">Add New Task</h2>
              </div>
              <TaskForm />
            </div>
          </div>

          {/* Task List Main Area */}
          <div className="lg:col-span-8">
            <Suspense
              fallback={
                <div className="task-list-container p-8">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-muted-foreground">Loading tasks...</p>
                  </div>
                </div>
              }
            >
              <TaskList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTracker;