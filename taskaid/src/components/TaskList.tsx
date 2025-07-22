import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Filter } from 'lucide-react';

export default function TaskList() {
  const mockTasks = [
    { id: 1, title: 'Complete project proposal', completed: false, dueDate: 'Today' },
    { id: 2, title: 'Review client feedback', completed: true, dueDate: 'Yesterday' },
    { id: 3, title: 'Schedule team meeting', completed: false, dueDate: 'Tomorrow' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Task
          </Button>
        </div>
      </div>
      
      <div className="flex-1 space-y-3 overflow-y-auto">
        {mockTasks.map((task) => (
          <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  className="mt-1 rounded"
                  onChange={() => {}}
                />
                <div className="flex-1">
                  <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Due: {task.dueDate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}