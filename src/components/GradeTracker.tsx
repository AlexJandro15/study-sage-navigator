import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';

interface GradeEntry {
  id: string;
  name: string;
  grade: number;
  weight: number;
}

const GradeTracker = () => {
  const [grades, setGrades] = useState<GradeEntry[]>([]);
  const [newEntry, setNewEntry] = useState<Omit<GradeEntry, 'id'>>({
    name: '',
    grade: 0,
    weight: 0,
  });

  const addGrade = () => {
    if (newEntry.name && newEntry.grade >= 0 && newEntry.weight > 0) {
      setGrades([
        ...grades,
        {
          id: crypto.randomUUID(),
          ...newEntry,
        },
      ]);
      setNewEntry({ name: '', grade: 0, weight: 0 });
    }
  };

  const removeGrade = (id: string) => {
    setGrades(grades.filter((grade) => grade.id !== id));
  };

  const calculateWeightedAverage = () => {
    if (grades.length === 0) return 0;
    
    const totalWeight = grades.reduce((sum, grade) => sum + grade.weight, 0);
    const weightedSum = grades.reduce(
      (sum, grade) => sum + (grade.grade * grade.weight),
      0
    );
    
    return totalWeight > 0 ? (weightedSum / totalWeight).toFixed(2) : 0;
  };

  return (
    <Card className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4">Seguimiento de Calificaciones</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <Label htmlFor="name">Evaluación</Label>
          <Input
            id="name"
            type="text"
            value={newEntry.name}
            onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
            placeholder="Ej: Examen Parcial"
          />
        </div>
        <div>
          <Label htmlFor="grade">Nota</Label>
          <Input
            id="grade"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={newEntry.grade}
            onChange={(e) => setNewEntry({ ...newEntry, grade: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div>
          <Label htmlFor="weight">Peso (%)</Label>
          <div className="flex gap-2">
            <Input
              id="weight"
              type="number"
              min="0"
              max="100"
              value={newEntry.weight}
              onChange={(e) => setNewEntry({ ...newEntry, weight: parseFloat(e.target.value) || 0 })}
            />
            <Button onClick={addGrade} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Evaluación</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead>Peso (%)</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>{grade.name}</TableCell>
                <TableCell>{grade.grade}</TableCell>
                <TableCell>{grade.weight}%</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeGrade(grade.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {grades.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No hay calificaciones registradas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-right">
        <p className="text-lg font-semibold">
          Promedio Ponderado: {calculateWeightedAverage()}
        </p>
      </div>
    </Card>
  );
};

export default GradeTracker;