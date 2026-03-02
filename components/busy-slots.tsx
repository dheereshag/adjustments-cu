import type { Slot } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Pill } from "@/components/kibo-ui/pill";

function formatTime(t: string) {
  return t.slice(0, 5);
}

interface BusySlotsProps {
  facultyName: string;
  day: string;
  slots: Slot[];
}

export function BusySlotsSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-5 w-64" />
      <div className="flex gap-2">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-7 w-24" />
      </div>
    </div>
  );
}

export function BusySlots({ facultyName, day, slots }: BusySlotsProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
        {facultyName}&apos;s busy slots on{" "}
        <span className="text-zinc-500">{day}</span>
      </h2>
      {slots.length === 0 ? (
        <p className="text-sm text-zinc-400">No scheduled classes found.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {slots.map((slot) => (
            <Pill key={slot.slot_number} variant="secondary">
              <span className="font-bold">Slot {slot.slot_number}</span>
              <span className="text-muted-foreground">
                {formatTime(slot.start_time)}-{formatTime(slot.end_time)}
              </span>
            </Pill>
          ))}
        </div>
      )}
    </div>
  );
}
