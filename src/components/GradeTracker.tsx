import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  subject: string;
  name: string;
  grade: number;
  weight: number;
}

const GradeTracker = () => {
  const [grades, setGrades] = useState<GradeEntry[]>([]);
  const [newEntry, setNewEntry] = useState<Omit<GradeEntry, 'id'>>({
    subject: '',
    name: '',
    grade: 0,
    weight: 0,
  });

  const addGrade = () => {
    if (newEntry.subject && newEntry.name && newEntry.grade >= 0 && newEntry.weight > 0) {
      setGrades([
        ...grades,
        {
          id: crypto.randomUUID(),
          ...newEntry,
        },
      ]);
      setNewEntry({ subject: newEntry.subject, name: '', grade: 0, weight: 0 });
    }
  };

  const removeGrade = (id: string) => {
    setGrades(grades.filter((grade) => grade.id !== id));
  };

  const calculateSubjectAverage = (subject: string) => {
    const subjectGrades = grades.filter((grade) => grade.subject === subject);
    if (subjectGrades.length === 0) return 0;
    
    const totalWeight = subjectGrades.reduce((sum, grade) => sum + grade.weight, 0);
    const weightedSum = subjectGrades.reduce(
      (sum, grade) => sum + (grade.grade * grade.weight),
      0
    );
    
    return totalWeight > 0 ? Number((weightedSum / totalWeight).toFixed(2)) : 0;
  };

  const calculateOverallAverage = () => {
    const subjects = [...new Set(grades.map(grade => grade.subject))];
    if (subjects.length === 0) return 0;
    
    const subjectAverages = subjects.map(subject => calculateSubjectAverage(subject));
    return (subjectAverages.reduce((a, b) => a + b, 0) / subjects.length).toFixed(2);
  };

  const getUniqueSubjects = () => [...new Set(grades.map(grade => grade.subject))];

  return (
    <Card className="w-full p-4">
      <h2 className="text-xl font-semibold mb-4">Seguimiento de Calificaciones</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <Label htmlFor="subject">Asignatura</Label>
          <Input
            id="subject"
            type="text"
            value={newEntry.subject}
            onChange={(e) => setNewEntry({ ...newEntry, subject: e.target.value })}
            placeholder="Ej: Matemáticas"
          />
        </div>
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
              <TableHead>Asignatura</TableHead>
              <TableHead>Evaluación</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead>Peso (%)</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>{grade.subject}</TableCell>
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
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No hay calificaciones registradas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 space-y-2">
        {getUniqueSubjects().map(subject => (
          <div key={subject} className="flex justify-between items-center px-4 py-2 bg-muted rounded-lg">
            <span className="font-medium">{subject}</span>
            <span>Promedio: {calculateSubjectAverage(subject)}</span>
          </div>
        ))}
        
        {grades.length > 0 && (
          <div className="flex justify-between items-center px-4 py-2 bg-primary/10 rounded-lg mt-4">
            <span className="font-semibold">Promedio General</span>
            <span className="font-semibold">{calculateOverallAverage()}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GradeTracker;