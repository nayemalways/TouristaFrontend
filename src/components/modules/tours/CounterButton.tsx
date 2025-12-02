"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export default function CounterButton({ 
  min = 1, 
  max = 30, 
  defaultValue = 0, 
  step = 1,
  onChange 
}: {
  min?: number;
  max?: number;
  defaultValue?: number;
  step?: number;
  onChange?: (value: number) => void;
}) {


  const [value, setValue] = useState(defaultValue);

  const update = (newValue: number) => {
    if (newValue < min || newValue > max) return;
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => update(value - step)}
        disabled={value <= min}
        className="rounded-full"
      >
        <Minus className="h-4 w-4" />
      </Button>

      <span className="w-10 text-center text-lg font-semibold">
        {value}
      </span>

      <Button 
        variant="outline" 
        size="icon"
        onClick={() => update(value + step)}
        disabled={value >= max}
        className="rounded-full"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
