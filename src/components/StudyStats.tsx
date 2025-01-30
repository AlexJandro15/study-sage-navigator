import React from 'react';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface StudySession {
  date: string;
  minutes: number;
}

const StudyStats = () => {
  // Mock data - replace with real data later
  const data: StudySession[] = [
    { date: 'Lun', minutes: 120 },
    { date: 'Mar', minutes: 90 },
    { date: 'Mie', minutes: 150 },
    { date: 'Jue', minutes: 80 },
    { date: 'Vie', minutes: 140 },
    { date: 'Sab', minutes: 60 },
    { date: 'Dom', minutes: 30 },
  ];

  return (
    <Card className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4">Estadísticas de Estudio</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="minutes"
              stroke="#6366F1"
              strokeWidth={2}
              name="Minutos"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default StudyStats;