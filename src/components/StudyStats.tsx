import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
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
  const [studyMinutes, setStudyMinutes] = useState<string>('');
  const [studyData, setStudyData] = useState<StudySession[]>([
    { date: 'Lun', minutes: 120 },
    { date: 'Mar', minutes: 90 },
    { date: 'Mie', minutes: 150 },
    { date: 'Jue', minutes: 80 },
    { date: 'Vie', minutes: 140 },
    { date: 'Sab', minutes: 60 },
    { date: 'Dom', minutes: 30 },
  ]);

  const handleAddStudyTime = () => {
    const minutes = parseInt(studyMinutes);
    if (isNaN(minutes) || minutes <= 0) {
      toast({
        title: "Error",
        description: "Por favor ingresa un número válido de minutos",
        variant: "destructive",
      });
      return;
    }

    const today = new Date();
    const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    const dayName = days[today.getDay()];

    const newData = [...studyData];
    const existingDayIndex = newData.findIndex(item => item.date === dayName);

    if (existingDayIndex !== -1) {
      newData[existingDayIndex].minutes += minutes;
    } else {
      if (newData.length >= 7) {
        newData.shift();
      }
      newData.push({ date: dayName, minutes });
    }

    setStudyData(newData);
    setStudyMinutes('');
    toast({
      title: "¡Tiempo registrado!",
      description: `Se han agregado ${minutes} minutos de estudio`,
    });
  };

  return (
    <Card className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4">Estadísticas de Estudio</h2>
      
      <div className="mb-6 flex gap-4">
        <Input
          type="number"
          placeholder="Minutos estudiados"
          value={studyMinutes}
          onChange={(e) => setStudyMinutes(e.target.value)}
          className="max-w-[200px]"
        />
        <Button onClick={handleAddStudyTime}>
          Registrar Tiempo
        </Button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={studyData}>
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