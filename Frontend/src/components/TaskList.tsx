import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Edit3, 
  Calendar,
  Target,
  Trophy,
  ListTodo,
  Loader2
} from 'lucide-react';
import { GET_ALL_TASKS_QUERY, UPDATE_TASK_STATUS_MUTATION } from '../graphql/queries';
import { useLazyLoadQuery, useMutation, fetchQuery } from 'react-relay';
import { relayEnvironment } from '../relay/environment';
import { Task, TaskStatus } from '../types/Task';
import { useToast } from '../hooks/use-toast';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshingSection, setRefreshingSection] = useState<'PENDING' | 'COMPLETED' | null>(null);
  const [isPageReloading, setIsPageReloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load tasks from Relay on mount
  const queryData = useLazyLoadQuery(GET_ALL_TASKS_QUERY, {} as any);
  useEffect(() => {
    try {
      setLoading(true);
      const list = queryData?.taskList ?? [];
      setTasks(list.map((t: any) => ({ id: t.id, title: t.title, description: t.description, status: t.status })));
      setError(null);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('Unable to load tasks');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData]);

  // Refetch tasks from server and show a refresh indicator in the provided section
  const refreshSectionAndFetch = async (section?: 'PENDING' | 'COMPLETED') => {
    if (!section) return;
    setRefreshingSection(section);
    setIsRefreshing(true);
    try {
      const data: any = await fetchQuery(relayEnvironment, GET_ALL_TASKS_QUERY, {} as any) as any;
      const list = data?.taskList ?? [];
      setTasks(list.map((t: any) => ({ id: t.id, title: t.title, description: t.description ?? '', status: t.status })));
    } catch (err) {
      console.error('Error refreshing tasks:', err);
      // optional: show a toast
    } finally {
      setIsRefreshing(false);
      setRefreshingSection(null);
    }
  };

  // Listen for refresh events triggered from other components (e.g., TaskForm)
  useEffect(() => {
    const onRefresh = (e: Event) => {
      try {
        const custom = e as CustomEvent<{ section?: 'PENDING' | 'COMPLETED' }>;
        refreshSectionAndFetch(custom?.detail?.section);
      } catch (err) {
        // ignore
      }
    };
    window.addEventListener('tasks:refresh', onRefresh as EventListener);
    const onReload = () => {
      // show overlay then reload
      setIsPageReloading(true);
      window.setTimeout(() => {
        try { window.location.reload(); } catch (e) { setIsPageReloading(false); }
      }, 300);
    };
    window.addEventListener('tasks:reload', onReload as EventListener);
    return () => {
      window.removeEventListener('tasks:refresh', onRefresh as EventListener);
      window.removeEventListener('tasks:reload', onReload as EventListener);
    };
  }, []);

  const [commitStatus] = useMutation(UPDATE_TASK_STATUS_MUTATION);

  const handleStatusToggle = async (task: Task) => {
    const newStatus = task.status === 'PENDING' ? 'COMPLETED' : 'PENDING';

    // Optimistic update: move task locally first
    const previous = tasks;
    setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, status: newStatus } : t)));

    try {
      // commit Relay mutation with optimistic response
      commitStatus({
        variables: { id: task.id, status: newStatus },
        optimisticResponse: {
          updateTask: {
            id: task.id,
            title: task.title,
            description: task.description,
            status: newStatus,
          },
        },
        onCompleted: (_response, errors) => {
          // If the mutation succeeded (no errors), show an overlay and reload the page so list is refreshed
          if (!errors || errors.length === 0) {
            try {
              // show a quick overlay so user sees the loading UI before full reload
              setIsPageReloading(true);
              window.setTimeout(() => {
                try { window.location.reload(); } catch (e) { /* fallback below */ }
              }, 400);
            } catch (e) {
              // fallback: trigger section refresh
              refreshSectionAndFetch(newStatus === 'COMPLETED' ? 'COMPLETED' : 'PENDING');
            }
          }
        },
      });
      toast({
        title: newStatus === 'COMPLETED' ? "Task Completed! 🎉" : "Task Reopened",
        description: newStatus === 'COMPLETED'
          ? "Great job on finishing this task!"
          : "Task moved back to pending",
      });
    } catch (err) {
      // Revert optimistic change
      console.error('Error updating task status:', err);
      setTasks(previous);
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      });
    }
  };

  const completedTasks = tasks.filter(task => task.status === 'COMPLETED');
  const pendingTasks = tasks.filter(task => task.status === 'PENDING');

  if (loading) {
    return (
      <div className="task-list-container p-6">
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground text-sm">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-list-container p-6">
        <div className="text-center py-12">
          <div className="p-4 bg-red-50 rounded-full mb-4 inline-block">
            <Target className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">{error}</h3>
          <p className="text-muted-foreground text-sm">Please check your connection and try again.</p>
        </div>
      </div>
    );
  }


  if (tasks.length === 0) {
    return (
      <div className="task-list-container p-6">
        <div className="text-center py-16">
          <div className="p-6 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-full mb-6 inline-block">
            <ListTodo className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-xl font-medium text-foreground mb-2">No tasks yet</h3>
          <p className="text-muted-foreground">Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container p-6 relative">
      {isPageReloading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative z-10 bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 w-[min(560px,90%)] border">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary text-white shadow-lg animate-pulse scale-[1.02]">
                <Loader2 className="w-7 h-7 animate-spin text-white" />
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold text-slate-900">Refreshing tasks</div>
                <div className="text-sm text-slate-600">Tasks will appear shortly</div>
              </div>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
              <div className="h-2 bg-primary rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <ListTodo className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">My Tasks</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-full">
          <CheckCircle2 className="w-4 h-4" />
          <span>{completedTasks.length} of {tasks.length} completed</span>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-3 gap-4 my-6">
        <div className="stats-card stats-card-primary">
          <div className="text-2xl font-bold">{tasks.length}</div>
          <div className="text-sm font-medium mt-1">Total Tasks</div>
        </div>
        <div className="stats-card stats-card-warning">
          <div className="text-2xl font-bold">{pendingTasks.length}</div>
          <div className="text-sm font-medium mt-1">In Progress</div>
        </div>
        <div className="stats-card stats-card-success">
          <div className="text-2xl font-bold">{completedTasks.length}</div>
          <div className="text-sm font-medium mt-1">Completed</div>
        </div>
      </div>
      
      {/* Tasks List: split into Pending and Completed sections */}
      <div className="grid grid-cols-2 gap-6">
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Pending</h3>
            {isRefreshing && refreshingSection === 'PENDING' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Refreshing</span>
              </div>
            )}
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {pendingTasks.map((task) => (
              <article key={task.id} className="task-card task-card-pending">
                <div className="flex items-start gap-4">
                  <button onClick={() => handleStatusToggle(task)} className="mt-1 p-1 rounded-full">
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium">{task.title}</h3>
                    {task.description && <p className="text-sm mt-1 text-muted-foreground">{task.description}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="badge-pending">{task.status}</span>
                    <button onClick={() => handleStatusToggle(task)} className="text-xs px-3 py-1.5 rounded-md font-medium bg-green-50 text-success">Done</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Completed</h3>
            {isRefreshing && refreshingSection === 'COMPLETED' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Refreshing</span>
              </div>
            )}
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {completedTasks.map((task) => (
              <article key={task.id} className="task-card task-card-completed">
                <div className="flex items-start gap-4">
                  <button onClick={() => handleStatusToggle(task)} className="mt-1 p-1 rounded-full">
                    <CheckCircle2 className="w-5 h-5 fill-current" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium line-through text-muted-foreground">{task.title}</h3>
                    {task.description && <p className="text-sm mt-1 text-muted-foreground/60">{task.description}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="badge-completed">{task.status}</span>
                    <button onClick={() => handleStatusToggle(task)} className="text-xs px-3 py-1.5 rounded-md font-medium bg-orange-50 text-warning">Undo</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Progress Message */}
      {tasks.length > 0 && (
        <div className="text-center py-6 mt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {completedTasks.length === tasks.length 
              ? "🎉 Excellent work! All tasks completed!" 
              : `${tasks.length - completedTasks.length} tasks remaining`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;