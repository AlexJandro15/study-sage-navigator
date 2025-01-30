import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from 'date-fns/locale';

interface Exam {
  date: Date;
  subject: string;
}

const ExamCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [exams] = useState<Exam[]>([
    {
      date: new Date(2024, 3, 15),
      subject: "Matemáticas"
    },
    {
      date: new Date(2024, 3, 20),
      subject: "Física"
    },
    {
      date: new Date(2024, 3, 25),
      subject: "Química"
    }
  ]);

  const hasExamOnDate = (date: Date) => {
    return exams.some(exam => 
      format(exam.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const getExamsForDate = (date: Date) => {
    return exams.filter(exam => 
      format(exam.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Calendario de Exámenes</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={es}
          modifiers={{
            hasExam: (date) => hasExamOnDate(date),
          }}
          modifiersStyles={{
            hasExam: {
              fontWeight: 'bold',
              backgroundColor: '#e11d48',
              color: 'white',
              borderRadius: '50%',
            }
          }}
        />
        {date && getExamsForDate(date).length > 0 && (
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">
              Exámenes para {format(date, 'dd/MM/yyyy')}:
            </h3>
            <div className="space-y-2">
              {getExamsForDate(date).map((exam, index) => (
                <Badge key={index} variant="secondary" className="mr-2">
                  {exam.subject}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExamCalendar;