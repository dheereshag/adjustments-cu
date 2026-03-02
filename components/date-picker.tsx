"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  onDateChange?: (date: Date | undefined) => void;
}

export default function DatePicker({ onDateChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Adjustment Date
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal"
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day) => {
              setDate(day);
              onDateChange?.(day);
            }}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
