import React, { useState } from 'react';
import TaskList from '@/components/TaskList';
import PomodoroTimer from '@/components/PomodoroTimer';
import StudyStats from '@/components/StudyStats';
import ExamCalendar from '@/components/ExamCalendar';
import ColorCustomizer from '@/components/ColorCustomizer';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  duration: number;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Matemáticas: Ecuaciones Diferenciales',
      completed: false,
      duration: 45,
    },
    {
      id: '2',
      title: 'Física: Mecánica Cuántica',
      completed: false,
      duration: 60,
    },
    {
      id: '3',
      title: 'Química: Equilibrio Químico',
      completed: true,
      duration: 30,
    },
  ]);

  const handleTaskToggle = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Mi Plan de Estudio
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TaskList tasks={tasks} onTaskToggle={handleTaskToggle} />
            <StudyStats />
          </div>
          <div className="space-y-6">
            <PomodoroTimer />
            <ExamCalendar />
          </div>
        </div>
      </div>
      <ColorCustomizer />
    </div>
  );
};

export default Index;