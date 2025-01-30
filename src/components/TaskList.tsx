import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  duration: number; // in minutes
}

interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
}

const TaskList = ({ tasks, onTaskToggle }: TaskListProps) => {
  return (
    <Card className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4">Tareas de Estudio</h2>
      <ScrollArea className="h-[300px] w-full pr-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center space-x-4 py-2 border-b last:border-0"
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onTaskToggle(task.id)}
            />
            <div className="flex-1">
              <p className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </p>
              <p className="text-sm text-gray-500">{task.duration} minutos</p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </Card>
  );
};

export default TaskList;