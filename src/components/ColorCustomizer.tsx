import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Palette } from 'lucide-react';
import { useTheme } from 'next-themes';

const colorSchemes = [
  {
    name: "Púrpura",
    primary: "#9b87f5",
    secondary: "#7E69AB",
  },
  {
    name: "Verde Suave",
    primary: "#86efac",
    secondary: "#4ade80",
  },
  {
    name: "Azul Suave",
    primary: "#93c5fd",
    secondary: "#60a5fa",
  },
  {
    name: "Naranja Suave",
    primary: "#FEC6A1",
    secondary: "#fdba74",
  }
];

const ColorCustomizer = () => {
  const { theme, setTheme } = useTheme();

  const applyColorScheme = (primary: string, secondary: string) => {
    document.documentElement.style.setProperty('--primary', primary);
    document.documentElement.style.setProperty('--secondary', secondary);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed bottom-4 right-4 rounded-full">
          <Palette className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Personalización</SheetTitle>
          <SheetDescription>
            Personaliza los colores de tu aplicación
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Esquemas de Color</h3>
            <div className="grid grid-cols-2 gap-2">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.name}
                  className="p-4 rounded-lg border hover:border-primary transition-colors"
                  onClick={() => applyColorScheme(scheme.primary, scheme.secondary)}
                >
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: scheme.primary }}
                      />
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: scheme.secondary }}
                      />
                    </div>
                    <span className="text-sm">{scheme.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Tema</h3>
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => setTheme('light')}
                className="flex-1"
              >
                Claro
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => setTheme('dark')}
                className="flex-1"
              >
                Oscuro
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ColorCustomizer;