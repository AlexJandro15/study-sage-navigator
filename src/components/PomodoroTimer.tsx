import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (!isBreak) {
        toast({
          title: "¡Tiempo completado!",
          description: "Es hora de tomar un descanso.",
        });
        setTimeLeft(5 * 60); // 5 minute break
        setIsBreak(true);
      } else {
        toast({
          title: "¡Descanso terminado!",
          description: "¡Volvamos al estudio!",
        });
        setTimeLeft(25 * 60);
        setIsBreak(false);
      }
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setIsBreak(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = isBreak
    ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
    : ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <Card className="w-full p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          {isBreak ? 'Tiempo de Descanso' : 'Tiempo de Estudio'}
        </h2>
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold">
              {minutes.toString().padStart(2, '0')}:
              {seconds.toString().padStart(2, '0')}
            </span>
          </div>
          <Progress value={progress} className="h-2 w-full" />
        </div>
        <div className="space-x-4">
          <Button onClick={toggleTimer} variant="default">
            {isRunning ? 'Pausar' : 'Iniciar'}
          </Button>
          <Button onClick={resetTimer} variant="outline">
            Reiniciar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PomodoroTimer;