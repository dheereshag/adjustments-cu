import type { FacultyFreeSlots, Slot } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Pill } from "@/components/kibo-ui/pill";

function formatTime(t: string) {
  return t.slice(0, 5);
}

interface ResultsTableProps {
  results: FacultyFreeSlots[];
  facultyName: string;
  day: string;
}

function SlotBadge({ slot }: { slot: Slot }) {
  return (
    <Pill className="bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 hover:bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-500/20">
      <span className="font-medium">Slot {slot.slot_number}</span>
      <span className="text-emerald-500">
        {formatTime(slot.start_time)}–{formatTime(slot.end_time)}
      </span>
    </Pill>
  );
}

export function ResultsTableSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-5 w-52" />
      <Skeleton className="h-3 w-80" />
      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
        <div className="flex gap-4 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-28" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3">
            <Skeleton className="h-4 w-36" />
            <div className="flex gap-1.5">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ResultsTable({ results, facultyName, day }: ResultsTableProps) {
  if (results.length === 0) {
    return (
      <p className="text-sm text-zinc-400">
        No faculty is free in any of these slots on {day}.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
        Available faculties on <span className="text-zinc-500">{day}</span>
      </h2>
      <p className="text-xs text-zinc-400">
        Showing faculties who are free in at least one of {facultyName}&apos;s
        busy slots.
      </p>
      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
              <th className="px-4 py-2.5 text-left font-medium text-zinc-600 dark:text-zinc-400">
                Faculty
              </th>
              <th className="px-4 py-2.5 text-left font-medium text-zinc-600 dark:text-zinc-400">
                Free in these slots
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map(({ faculty, freeSlots }, idx) => (
              <tr
                key={faculty.id}
                className={
                  idx % 2 === 0
                    ? "bg-white dark:bg-black"
                    : "bg-zinc-50 dark:bg-zinc-950"
                }
              >
                <td className="px-4 py-3 font-medium text-zinc-800 dark:text-zinc-200">
                  {faculty.name}
                  <span className="ml-1.5 text-xs font-normal text-zinc-400">
                    E{faculty.id}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {freeSlots.map((slot) => (
                      <SlotBadge key={slot.slot_number} slot={slot} />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
