import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { useMutation } from 'react-relay';
import { CREATE_TASK_MUTATION } from '../graphql/queries';

type Props = {
  onCreate?: (task: any) => void;
};


const TaskForm: React.FC<Props> = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [commitCreate] = useMutation(CREATE_TASK_MUTATION as any);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({ title: 'Title Required', description: 'Please enter a task title', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);

    commitCreate({
      variables: { request: { title: title.trim(), description: description.trim() } },
      optimisticResponse: {
        createTask: {
          id: `temp-${Date.now()}`,
          title: title.trim(),
          description: description.trim(),
          status: 'PENDING',
        },
      },
      onCompleted: (resp: any) => {
        const created = resp?.createTask;
        if (created && onCreate) onCreate(created);
        setTitle('');
        setDescription('');
        toast({ title: 'Task Created! 🎉', description: 'Your new task has been added successfully' });
        setIsSubmitting(false);
  // trigger a full reload via TaskList so the same overlay is shown (matches update behavior)
  try { window.dispatchEvent(new CustomEvent('tasks:reload')); } catch (e) { /* ignore in non-browser env */ }
      },
      onError: (err: any) => {
        console.error('Error creating task:', err);
        toast({ title: 'Error', description: 'Failed to create task. Please try again.', variant: 'destructive' });
        setIsSubmitting(false);
      },
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="task-title" className="block text-sm font-medium text-foreground">Task Title</label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="task-description" className="block text-sm font-medium text-foreground">Description</label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details (optional)..."
            rows={3}
            className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={!title.trim() || isSubmitting}
          className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${!title.trim() || isSubmitting ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md'}`}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Adding Task...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Add Task
            </>
          )}
        </button>

        {(title || description) && !isSubmitting && (
          <button type="button" onClick={() => { setTitle(''); setDescription(''); }} className="w-full px-4 py-2 text-sm border border-border rounded-lg bg-background text-muted-foreground hover:bg-muted transition-colors">Clear</button>
        )}
      </form>
    </div>
  );
};

export default TaskForm;