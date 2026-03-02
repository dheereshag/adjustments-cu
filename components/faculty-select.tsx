"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/kibo-ui/combobox";
import type { Faculty } from "@/lib/types";

interface FacultySelectProps {
  faculties: Faculty[];
  onValueChange?: (value: string) => void;
}

export default function FacultySelect({
  faculties,
  onValueChange,
}: FacultySelectProps) {
  const facultyOptions = faculties.map((faculty) => ({
    value: String(faculty.id),
    label: `${faculty.name} (E${faculty.id})`,
  }));

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Requesting Faculty
      </label>
      <Combobox
        data={facultyOptions}
        type="faculty"
        onValueChange={onValueChange}
      >
        <ComboboxTrigger className="w-72" />
        <ComboboxContent>
          <ComboboxInput />
          <ComboboxEmpty />
          <ComboboxList>
            <ComboboxGroup>
              {facultyOptions.map((faculty) => (
                <ComboboxItem key={faculty.value} value={faculty.value}>
                  {faculty.label}
                </ComboboxItem>
              ))}
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
