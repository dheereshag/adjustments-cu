"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Faculty {
  id: number;
  name: string;
}

interface FacultySelectProps {
  faculties: Faculty[];
}

export default function FacultySelect({ faculties }: FacultySelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Requesting Faculty
      </label>
      <Select>
        <SelectTrigger className="w-72">
          <SelectValue placeholder="Select a faculty member" />
        </SelectTrigger>
        <SelectContent>
          {faculties.map((faculty) => (
            <SelectItem key={faculty.id} value={String(faculty.id)}>
              {faculty.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
